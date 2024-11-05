import type { PostgresTable } from '@supabase/postgres-meta'
import { ChevronRight } from 'lucide-react'

import { useParams } from 'common'
import { ColumnList } from 'components/interfaces/Database'
import { SidePanelEditor } from 'components/interfaces/TableGridEditor'
import DeleteConfirmationDialogs from 'components/interfaces/TableGridEditor/DeleteConfirmationDialogs'
import DatabaseLayout from 'components/layouts/DatabaseLayout/DatabaseLayout'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { ScaffoldContainer, ScaffoldSection } from 'components/layouts/Scaffold'
import { FormHeader } from 'components/ui/Forms/FormHeader'
import {
  getTableLikeFromTableEditor,
  useTableEditorQuery,
} from 'data/table-editor/table-editor-query'
import { useTableEditorStateSnapshot } from 'state/table-editor'
import type { NextPageWithLayout } from 'types'
import ShimmeringLoader from 'ui-patterns/ShimmeringLoader'

const DatabaseTables: NextPageWithLayout = () => {
  const snap = useTableEditorStateSnapshot()

  const { id: _id } = useParams()
  const id = _id ? Number(_id) : undefined

  const { project } = useProjectContext()
  const { data, isLoading } = useTableEditorQuery({
    projectRef: project?.ref,
    connectionString: project?.connectionString,
    id,
  })
  const selectedTable = getTableLikeFromTableEditor(data)

  return (
    <>
      <ScaffoldContainer>
        <ScaffoldSection>
          <div className="col-span-12 space-y-6">
            <div className="flex items-center space-x-2">
              <FormHeader className="!mb-0" title="Database Tables" />
              <ChevronRight size={18} strokeWidth={1.5} className="text-foreground-light" />
              {isLoading ? (
                <ShimmeringLoader className="w-40" />
              ) : (
                <FormHeader className="!mb-0" title={selectedTable?.name ?? ''} />
              )}
            </div>
            <ColumnList
              onAddColumn={snap.onAddColumn}
              onEditColumn={snap.onEditColumn}
              onDeleteColumn={snap.onDeleteColumn}
            />
          </div>
        </ScaffoldSection>
      </ScaffoldContainer>

      <DeleteConfirmationDialogs selectedTable={selectedTable} />
      <SidePanelEditor includeColumns selectedTable={selectedTable as PostgresTable} />
    </>
  )
}

DatabaseTables.getLayout = (page) => <DatabaseLayout title="Database">{page}</DatabaseLayout>

export default DatabaseTables
