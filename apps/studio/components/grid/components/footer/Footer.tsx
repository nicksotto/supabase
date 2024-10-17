import { useParams } from 'common'
import { GridFooter } from 'components/ui/GridFooter'
import TwoOptionToggle from 'components/ui/TwoOptionToggle'
import { ENTITY_TYPE } from 'data/entity-types/entity-type-constants'
import useEntityType from 'hooks/misc/useEntityType'
import useTable from 'hooks/misc/useTable'
import { useUrlState } from 'hooks/ui/useUrlState'
import RefreshButton from '../header/RefreshButton'
import { Pagination } from './pagination'
import { useTrackedState } from 'components/grid/store/Store'

export interface FooterProps {
  isRefetching?: boolean
}

const Footer = ({ isRefetching }: FooterProps) => {
  const { id: _id } = useParams()
  const id = _id ? Number(_id) : undefined
  const { data: selectedTable } = useTable(id)
  const entityType = useEntityType(selectedTable?.id)
  const state = useTrackedState()
  const { selectedRows, allRowsSelected } = state

  const [{ view: selectedView = 'data' }, setUrlState] = useUrlState()

  const setSelectedView = (view: string) => {
    if (view === 'data') {
      setUrlState({ view: undefined })
    } else {
      setUrlState({ view })
    }
  }

  const isViewSelected =
    entityType?.type === ENTITY_TYPE.VIEW || entityType?.type === ENTITY_TYPE.MATERIALIZED_VIEW
  const isTableSelected = entityType?.type === ENTITY_TYPE.TABLE

  return (
    <GridFooter>
      {selectedView === 'data' && <Pagination />}
      {selectedRows.size > 0 && (
        <div className="text-xs text-foreground-light flex items-center gap-2 ml-2">
          <span className="text-lg">&middot;</span>
          <span>
            {allRowsSelected
              ? `All rows in table selected`
              : selectedRows.size > 1
                ? `${selectedRows.size} rows selected`
                : `${selectedRows.size} row selected`}
          </span>
        </div>
      )}
      <div className="ml-auto flex items-center gap-x-2">
        {selectedTable && selectedView === 'data' && (
          <RefreshButton table={selectedTable} isRefetching={isRefetching} />
        )}

        {(isViewSelected || isTableSelected) && (
          <TwoOptionToggle
            width={75}
            options={['definition', 'data']}
            activeOption={selectedView}
            borderOverride="border"
            onClickOption={setSelectedView}
          />
        )}
      </div>
    </GridFooter>
  )
}

export default Footer
