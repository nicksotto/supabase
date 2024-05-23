import { PermissionAction } from '@supabase/shared-types/out/constants'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IconAlertCircle, IconClock, AlertDescription_Shadcn_, Alert_Shadcn_ } from 'ui'
import ConfirmationModal from 'ui-patterns/Dialogs/ConfirmationModal'

import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import InformationBox from 'components/ui/InformationBox'
import Panel from 'components/ui/Panel'
import UpgradeToPro from 'components/ui/UpgradeToPro'
import { useBackupRestoreMutation } from 'data/database/backup-restore-mutation'
import { DatabaseBackup, useBackupsQuery } from 'data/database/backups-query'
import { setProjectStatus } from 'data/projects/projects-query'
import { useCheckPermissions, useSelectedOrganization } from 'hooks'
import { PROJECT_STATUS } from 'lib/constants'
import BackupItem from './BackupItem'
import BackupsEmpty from './BackupsEmpty'
import { WarningIcon } from 'ui-patterns/Icons/StatusIcons'

const BackupsList = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const organization = useSelectedOrganization()

  const { project: selectedProject } = useProjectContext()
  const projectRef = selectedProject?.ref || 'default'
  const isHealthy = selectedProject?.status === PROJECT_STATUS.ACTIVE_HEALTHY

  const [selectedBackup, setSelectedBackup] = useState<DatabaseBackup>()

  const canTriggerScheduledBackups = useCheckPermissions(
    PermissionAction.INFRA_EXECUTE,
    'queue_job.restore.prepare'
  )

  const { data: backups } = useBackupsQuery({ projectRef })
  const {
    mutate: restoreFromBackup,
    isLoading: isRestoring,
    isSuccess: isSuccessBackup,
  } = useBackupRestoreMutation({
    onSuccess: () => {
      setTimeout(() => {
        setProjectStatus(queryClient, projectRef, PROJECT_STATUS.RESTORING)
        toast.success(
          `Restoring database back to ${dayjs(selectedBackup?.inserted_at).format(
            'DD MMM YYYY HH:mm:ss'
          )}`
        )
        router.push(`/project/${projectRef}`)
      }, 3000)
    },
  })

  const planKey = backups?.tierKey ?? ''
  const sortedBackups = (backups?.backups ?? []).sort(
    (a, b) => new Date(b.inserted_at).valueOf() - new Date(a.inserted_at).valueOf()
  )
  const isPitrEnabled = backups?.pitr_enabled

  if (planKey === 'FREE') {
    return (
      <UpgradeToPro
        icon={<IconClock size="large" />}
        primaryText="Free Plan does not include project backups."
        projectRef={projectRef}
        organizationSlug={organization!.slug}
        secondaryText="Upgrade to the Pro plan for up to 7 days of scheduled backups."
        addon="pitr"
      />
    )
  }

  if (isPitrEnabled) return null

  return (
    <>
      <div className="space-y-6">
        {sortedBackups.length === 0 && planKey !== 'FREE' ? (
          <BackupsEmpty />
        ) : (
          <>
            {!canTriggerScheduledBackups && (
              <InformationBox
                icon={<IconAlertCircle className="text-foreground-light" strokeWidth={2} />}
                title="You need additional permissions to trigger a scheduled backup"
              />
            )}
            <Alert_Shadcn_ variant="default">
              <WarningIcon />
              <AlertDescription_Shadcn_>
                Database backups do not include objects stored via the Storage API, as the database
                only includes metadata about these objects. Restoring an old backup does not restore
                objects that have been deleted since then.
              </AlertDescription_Shadcn_>
            </Alert_Shadcn_>
            <Panel>
              {sortedBackups?.map((x, i: number) => {
                return (
                  <BackupItem
                    key={x.id}
                    backup={x}
                    projectRef={projectRef}
                    index={i}
                    isHealthy={isHealthy}
                    onSelectBackup={() => setSelectedBackup(x)}
                  />
                )
              })}
            </Panel>
          </>
        )}
      </div>
      <ConfirmationModal
        size="medium"
        confirmLabel="Confirm restore"
        confirmLabelLoading="Restoring"
        visible={selectedBackup !== undefined}
        title="Confirm to restore from backup"
        loading={isRestoring || isSuccessBackup}
        onCancel={() => setSelectedBackup(undefined)}
        onConfirm={() => {
          if (selectedBackup === undefined) return console.error('Backup required')
          restoreFromBackup({ ref: projectRef, backup: selectedBackup })
        }}
      >
        <p>
          Are you sure you want to restore from{' '}
          {dayjs(selectedBackup?.inserted_at).format('DD MMM YYYY')}? This will destroy any new data
          written since this backup was made.
        </p>
      </ConfirmationModal>
    </>
  )
}

export default BackupsList
