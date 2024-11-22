import { PermissionAction } from '@supabase/shared-types/out/constants'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import BackupsEmpty from 'components/interfaces/Database/Backups/BackupsEmpty'
import DatabaseBackupsNav from 'components/interfaces/Database/Backups/DatabaseBackupsNav'
import { PITRForm } from 'components/interfaces/Database/Backups/PITR/pitr-form'
import { BackupsList } from 'components/interfaces/Database/Backups/RestoreToNewProject/BackupsList'
import { ConfirmRestoreDialog } from 'components/interfaces/Database/Backups/RestoreToNewProject/ConfirmRestoreDialog'
import { CreateNewProjectDialog } from 'components/interfaces/Database/Backups/RestoreToNewProject/CreateNewProjectDialog'
import { Markdown } from 'components/interfaces/Markdown'
import DatabaseLayout from 'components/layouts/DatabaseLayout/DatabaseLayout'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { ScaffoldContainer, ScaffoldSection } from 'components/layouts/Scaffold'
import AlertError from 'components/ui/AlertError'
import { FormHeader } from 'components/ui/Forms/FormHeader'
import NoPermission from 'components/ui/NoPermission'
import { GenericSkeletonLoader } from 'components/ui/ShimmeringLoader'
import UpgradeToPro from 'components/ui/UpgradeToPro'
import { useCloneBackupsQuery } from 'data/projects/clone-query'
import { useCloneStatusQuery } from 'data/projects/clone-status-query'
import { useOrgSubscriptionQuery } from 'data/subscriptions/org-subscription-query'
import { useCheckPermissions, usePermissionsLoaded } from 'hooks/misc/useCheckPermissions'
import { useSelectedOrganization } from 'hooks/misc/useSelectedOrganization'
import { PROJECT_STATUS } from 'lib/constants'
import { getDatabaseMajorVersion } from 'lib/helpers'
import type { NextPageWithLayout } from 'types'
import { Alert_Shadcn_, AlertDescription_Shadcn_, AlertTitle_Shadcn_ } from 'ui'
import { Admonition } from 'ui-patterns'

const RestoreToNewProjectPage: NextPageWithLayout = () => {
  return (
    <ScaffoldContainer>
      <ScaffoldSection>
        <div className="col-span-12">
          <div className="space-y-6">
            <FormHeader className="!mb-0" title="Database Backups" />
            <DatabaseBackupsNav active="rtnp" />
            <div className="space-y-8">
              <RestoreToNewProject />
            </div>
          </div>
        </div>
      </ScaffoldSection>
    </ScaffoldContainer>
  )
}

RestoreToNewProjectPage.getLayout = (page) => (
  <DatabaseLayout title="Database">{page}</DatabaseLayout>
)

const RestoreToNewProject = () => {
  const { project } = useProjectContext()
  const organization = useSelectedOrganization()
  const { data: subscription } = useOrgSubscriptionQuery({ orgSlug: organization?.slug })
  const isFreePlan = subscription?.plan?.id === 'free'

  const {
    data: cloneBackups,
    error,
    isLoading: cloneBackupsLoading,
    isError,
  } = useCloneBackupsQuery({ projectRef: project?.ref }, { enabled: !isFreePlan })

  const plan = subscription?.plan?.id
  const isActiveHealthy = project?.status === PROJECT_STATUS.ACTIVE_HEALTHY

  const isPermissionsLoaded = usePermissionsLoaded()
  const canReadPhysicalBackups = useCheckPermissions(PermissionAction.READ, 'physical_backups')
  const canTriggerPhysicalBackups = useCheckPermissions(
    PermissionAction.INFRA_EXECUTE,
    'queue_job.restore.prepare'
  )
  const hasPITREnabled = cloneBackups?.pitr_enabled

  const dbVersion = getDatabaseMajorVersion(project?.dbVersion ?? '')
  const IS_PG15_OR_ABOVE = dbVersion >= 15
  const PHYSICAL_BACKUPS_ENABLED = project?.is_physical_backups_enabled

  const {
    data: cloneStatus,
    refetch: refetchCloneStatus,
    isLoading: cloneStatusLoading,
  } = useCloneStatusQuery({
    projectRef: project?.ref,
  })
  const lastClone = cloneStatus?.clones?.[cloneStatus?.clones.length - 1]
  const [selectedBackupId, setSelectedBackupId] = useState<number | null>(null)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [recoveryTimeTarget, setRecoveryTimeTarget] = useState<number | null>(null)
  const IS_CLONED_PROJECT = (cloneStatus?.cloned_from?.source_project as any)?.ref ? true : false

  const isLoading = !isPermissionsLoaded || cloneBackupsLoading || cloneStatusLoading

  if (isLoading) {
    return <GenericSkeletonLoader />
  }

  if (!canReadPhysicalBackups) {
    return <NoPermission resourceText="view backups" />
  }

  if (!canTriggerPhysicalBackups) {
    return <NoPermission resourceText="restore backups" />
  }

  if (!IS_PG15_OR_ABOVE) {
    return (
      <Admonition
        type="default"
        title="Restore to new project is not available for this database version"
      >
        <Markdown
          content={`Restore to new project is only available for Postgres 15 and above.  
            Go to [infrastructure settings](/project/${project?.ref}/settings/infrastructure)
            to upgrade your database version.
          `}
        />
      </Admonition>
    )
  }

  if (!PHYSICAL_BACKUPS_ENABLED) {
    return (
      <Admonition
        type="default"
        title="Restore to new project requires physical backups"
        description={
          <>
            Physical backups must be enabled to restore your database to a new project.
            <br /> Find out more about how backups work at supabase{' '}
            <Link
              target="_blank"
              className="underline"
              href="https://supabase.com/docs/guides/platform/backups"
            >
              in our docs
            </Link>
            .
          </>
        }
      />
    )
  }

  if (plan === 'free') {
    return (
      <UpgradeToPro
        buttonText="Upgrade"
        primaryText="Restore to a new project requires a pro plan or above."
        secondaryText={
          'To restore to a new project, you need to upgrade to a Pro plan and have physical backups enabled.'
        }
      />
    )
  }

  if (IS_CLONED_PROJECT) {
    return (
      <Admonition type="default" title={`This project cannot be restored to a new project`}>
        <Markdown
          content={`This project was originally restored from another project. This is a temporary limitation. Please [contact us](/support/new?ref=${project?.ref}) if you need to restore a project to multiple other projects.  
            [Go to original project](/dashboard/project/${(cloneStatus?.cloned_from?.source_project as any)?.ref || ''})`}
        />
      </Admonition>
    )
  }

  if (isError) {
    return <AlertError error={error} subject="Failed to retrieve backups" />
  }

  if (!isActiveHealthy) {
    return (
      <Admonition
        type="default"
        title="Restore to new project is not available while project is offline"
        description="Your project needs to be online to restore your database to a new project"
      />
    )
  }

  if (lastClone?.status === 'FAILED') {
    return (
      <Admonition type="destructive" title="Failed to restore to new project">
        <Markdown
          content="The new project failed to be created.  
            [Contact support](/support/new?category=dashboard_bug)"
        />
      </Admonition>
    )
  }

  if (lastClone?.status === 'COMPLETED') {
    return (
      <Admonition type="default" title="Restoration completed">
        <Markdown
          content={`The new project has been created. A project can only be restored to another project once.
            [Go to new project](/project/${lastClone?.target_project.ref})
          `}
        />
      </Admonition>
    )
  }

  if (lastClone?.status === 'IN_PROGRESS') {
    return (
      <Alert_Shadcn_ className="[&>svg]:bg-none! [&>svg]:text-foreground-light">
        <Loader2 className="animate-spin" />
        <AlertTitle_Shadcn_>Restoration in progress</AlertTitle_Shadcn_>
        <AlertDescription_Shadcn_>
          The new project is being created.
          <br />
          <Link className="underline" href={`/project/${lastClone?.target_project.ref}`}>
            Go to new project
          </Link>
        </AlertDescription_Shadcn_>
      </Alert_Shadcn_>
    )
  }

  if (
    !isLoading &&
    hasPITREnabled &&
    !cloneBackups?.physicalBackupData.earliestPhysicalBackupDateUnix
  ) {
    return (
      <Admonition
        type="default"
        title="No backups found"
        description={'PITR is enabled, but no backups were found. Check again in a few minutes.'}
      />
    )
  }

  if (!isLoading && !hasPITREnabled && cloneBackups?.backups.length === 0) {
    return <BackupsEmpty />
  }

  return (
    <>
      <ConfirmRestoreDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
        onSelectContinue={() => {
          setShowConfirmationDialog(false)
          setShowNewProjectDialog(true)
        }}
      />
      <CreateNewProjectDialog
        open={showNewProjectDialog}
        selectedBackupId={selectedBackupId}
        recoveryTimeTarget={recoveryTimeTarget}
        onOpenChange={setShowNewProjectDialog}
        onCloneSuccess={() => {
          refetchCloneStatus()
          setShowNewProjectDialog(false)
        }}
      />
      {hasPITREnabled ? (
        <>
          <PITRForm
            onSubmit={(v) => {
              setShowConfirmationDialog(true)
              setRecoveryTimeTarget(v.recoveryTimeTargetUnix)
            }}
            earliestAvailableBackupUnix={
              cloneBackups?.physicalBackupData.earliestPhysicalBackupDateUnix || 0
            }
            latestAvailableBackupUnix={
              cloneBackups?.physicalBackupData.latestPhysicalBackupDateUnix || 0
            }
          />
        </>
      ) : (
        <BackupsList
          onSelectRestore={(id) => {
            setSelectedBackupId(id)
            setShowConfirmationDialog(true)
          }}
        />
      )}
    </>
  )
}

export default RestoreToNewProjectPage
