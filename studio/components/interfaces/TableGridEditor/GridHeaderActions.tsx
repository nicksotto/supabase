import * as Tooltip from '@radix-ui/react-tooltip'
import type { PostgresPolicy, PostgresTable } from '@supabase/postgres-meta'
import { PermissionAction } from '@supabase/shared-types/out/constants'
import { useParams } from 'common'
import { MousePointer2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button, IconAlertCircle, IconCode, IconLock, Modal } from 'ui'

import { rlsAcknowledgedKey } from 'components/grid/constants'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import ConfirmationModal from 'components/ui/ConfirmationModal'
import { useCheckPermissions, useStore } from 'hooks'
import APIDocsButton from 'components/ui/APIDocsButton'

export interface GridHeaderActionsProps {
  table: PostgresTable
}

const GridHeaderActions = ({ table }: GridHeaderActionsProps) => {
  const { ref } = useParams()
  const { meta, ui } = useStore()
  const { project } = useProjectContext()

  const [isTogglingRealtime, setIsTogglingRealtime] = useState(false)
  const [showEnableRealtime, setShowEnableRealtime] = useState(false)

  const projectRef = project?.ref
  const publications = meta.publications.list()
  const policies = meta.policies.list((policy: PostgresPolicy) => policy.table_id === table.id)

  const realtimePublication = publications.find(
    (publication) => publication.name === 'supabase_realtime'
  )
  const realtimeEnabledTables = realtimePublication?.tables ?? []
  const isRealtimeEnabled = realtimeEnabledTables.some((t: any) => t.id === table?.id)

  const canSqlWriteTables = useCheckPermissions(PermissionAction.TENANT_SQL_ADMIN_WRITE, 'tables')
  const canSqlWriteColumns = useCheckPermissions(PermissionAction.TENANT_SQL_ADMIN_WRITE, 'columns')
  const isReadOnly = !canSqlWriteTables && !canSqlWriteColumns
  // This will change when we allow autogenerated API docs for schemas other than `public`
  const doesHaveAutoGeneratedAPIdocs = table.schema === 'public'

  const rlsKey = rlsAcknowledgedKey(table.id.toString())
  const rlsAcknowledgedChannel = useRef(new BroadcastChannel(rlsKey))
  const [showRLSWarning, setShowRLSWarning] = useState(
    !table.rls_enabled && localStorage.getItem(rlsKey) === 'true'
  )

  useEffect(() => {
    if (rlsAcknowledgedChannel.current) {
      rlsAcknowledgedChannel.current.close()
    }

    rlsAcknowledgedChannel.current = new BroadcastChannel(rlsKey)
    rlsAcknowledgedChannel.current.onmessage = (event) => {
      if (event.data.type === 'dismiss') {
        setShowRLSWarning(true)
      }
    }

    return () => rlsAcknowledgedChannel.current.close()
  }, [rlsKey])

  const toggleRealtime = async () => {
    if (!realtimePublication) return console.error('Unable to find realtime publication')

    setIsTogglingRealtime(true)
    const exists = realtimeEnabledTables.some((x: any) => x.id == table.id)
    const tables = !exists
      ? [`${table.schema}.${table.name}`].concat(
          realtimeEnabledTables.map((t: any) => `${t.schema}.${t.name}`)
        )
      : realtimeEnabledTables
          .filter((x: any) => x.id != table.id)
          .map((x: any) => `${x.schema}.${x.name}`)

    try {
      const id = realtimePublication.id
      const payload = { tables, id }
      const { error } = await meta.publications.update(id, payload)
      if (error) throw error
      setShowEnableRealtime(false)
    } catch (error: any) {
      ui.setNotification({
        category: 'error',
        message: `Failed to toggle realtime for ${table.name}: ${error.message}`,
      })
    } finally {
      setIsTogglingRealtime(false)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        {isReadOnly && (
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger className="w-full">
              <div className="border border-scale-700 rounded bg-scale-500 px-3 py-1 text-xs">
                Viewing as read-only
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom">
                <Tooltip.Arrow className="radix-tooltip-arrow" />
                <div
                  className={[
                    'rounded bg-scale-100 py-1 px-2 leading-none shadow',
                    'border border-scale-200',
                  ].join(' ')}
                >
                  <span className="text-xs text-foreground">
                    You need additional permissions to manage your project's data
                  </span>
                </div>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}

        {(table.rls_enabled || showRLSWarning) && (
          <Button
            asChild
            type={table.rls_enabled ? 'link' : 'warning'}
            icon={
              table.rls_enabled ? (
                <IconLock strokeWidth={2} size={14} />
              ) : (
                <IconAlertCircle strokeWidth={2} size={14} />
              )
            }
          >
            <Link href={`/project/${projectRef}/auth/policies?search=${table.id}`}>
              {!table.rls_enabled
                ? 'RLS is not enabled'
                : `${policies.length == 0 ? 'No' : policies.length} active RLS polic${
                    policies.length > 1 || policies.length == 0 ? 'ies' : 'y'
                  }`}
            </Link>
          </Button>
        )}
        <Button
          type="default"
          icon={
            <MousePointer2
              size={14}
              className={isRealtimeEnabled ? 'text-brand' : 'text-lighter'}
            />
          }
          onClick={() => setShowEnableRealtime(true)}
        >
          Realtime {isRealtimeEnabled ? 'on' : 'off'}
        </Button>

        {doesHaveAutoGeneratedAPIdocs && (
          <div className="mt-[1px]">
            <APIDocsButton section={['entities', table.name]} />
          </div>
        )}
      </div>

      <ConfirmationModal
        visible={showEnableRealtime}
        loading={isTogglingRealtime}
        header={`${isRealtimeEnabled ? 'Disable' : 'Enable'} realtime for ${table.name}`}
        buttonLabel={`${isRealtimeEnabled ? 'Disable' : 'Enable'} realtime`}
        buttonLoadingLabel={`${isRealtimeEnabled ? 'Disabling' : 'Enabling'} realtime`}
        onSelectCancel={() => setShowEnableRealtime(false)}
        onSelectConfirm={() => toggleRealtime()}
      >
        <Modal.Content className="py-4 space-y-2">
          <p className="text-sm">
            Once realtime has been {isRealtimeEnabled ? 'disabled' : 'enabled'}, the table will{' '}
            {isRealtimeEnabled ? 'no longer ' : ''}broadcast any changes to authorized subscribers.
          </p>
          {!isRealtimeEnabled && (
            <p className="text-sm">
              You may also select which events to broadcast to subscribers on the{' '}
              <Link href={`/project/${ref}/database/replication`} className="text-brand">
                database replication
              </Link>{' '}
              settings.
            </p>
          )}
        </Modal.Content>
      </ConfirmationModal>
    </>
  )
}

export default GridHeaderActions
