import { ArrowUpRight, RefreshCcw, Rewind } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProductEmptyState from 'components/to-be-cleaned/ProductEmptyState'
import AlertError from 'components/ui/AlertError'
import LoadingOpacity from 'components/ui/LoadingOpacity'
import ShimmerLine from 'components/ui/ShimmerLine'
import { useWarehouseAccessTokensQuery } from 'data/analytics/warehouse-access-tokens-query'
import { useWarehouseCollectionsQuery } from 'data/analytics/warehouse-collections-query'
import { useWarehouseQueryQuery } from 'data/analytics/warehouse-query'
import { useFlag } from 'hooks/ui/useFlag'
import { Button } from 'ui'
import LogTable from '../Settings/Logs/LogTable'
import { TestCollectionDialog } from './TestCollectionDialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/components/shadcn/ui/tooltip'
import { Input } from '@ui/components/shadcn/ui/input'

export const WarehouseCollectionDetail = () => {
  const router = useRouter()
  const collectionToken = router.query.collectionToken as string
  const projectRef = router.query.ref as string
  const accessTokens = useWarehouseAccessTokensQuery({ projectRef })
  const [testDialogOpen, setTestDialogOpen] = useState(false)
  const hasWarehouse = useFlag('warehouse')

  const { data: collections, isLoading: collectionsLoading } = useWarehouseCollectionsQuery(
    { projectRef },
    { enabled: hasWarehouse }
  )
  const collection = (collections || []).find((c) => c.token === collectionToken)
  const [params, setParams] = useState({
    sql: `select current_timestamp() as 'time'`,
  })
  const [search, setSearch] = useState('')

  const [filters, setFilters] = useState({
    limit: 100,
    offset: 0,
    search: '',
  })

  useEffect(() => {
    if (collection) {
      setParams((prevParams) => ({
        ...prevParams,
        sql: `
        select id, timestamp, event_message from \`${collection.name}\`
        where event_message like '%${filters.search}%'
        and timestamp > timestamp_sub(current_timestamp(), interval 7 day)
        order by timestamp desc limit ${filters.limit} offset ${filters.offset}
        `,
      }))
    }
  }, [collection, filters])

  const {
    isLoading: queryLoading,
    data: queryData,
    refetch,
    isError,
    isRefetching,
  } = useWarehouseQueryQuery(
    { ref: projectRef, sql: params.sql },
    {
      enabled: !!params.sql && hasWarehouse,
    }
  )

  const formatResults = (results: any) => {
    if (!results || !results.length) {
      return []
    }

    const r = results.map(({ timestamp, ...r }: any) => {
      return {
        timestamp: new Date(timestamp / 1000).toLocaleString(),
        ...r,
      }
    })

    return r
  }

  const results = formatResults(queryData?.result)

  function loadMore() {
    setFilters({ ...filters, offset: filters.offset + filters.limit })
  }

  const isLoading = queryLoading || collectionsLoading || isRefetching

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFilters({ ...filters, search })
    refetch()
  }

  return (
    <div className="relative flex flex-col flex-grow h-full">
      <ShimmerLine active={isLoading} />
      <LoadingOpacity active={isLoading}>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center h-12 px-5">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <h2 className="text-foreground-light">{collection?.name}</h2>
              <Input
                size="tiny"
                placeholder="Search by event message"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    htmlType="submit"
                    icon={<RefreshCcw />}
                    type="text"
                    loading={isLoading}
                    disabled={isLoading}
                    className="px-1.5"
                  />
                </TooltipTrigger>
                <TooltipContent>Refresh</TooltipContent>
              </Tooltip>
            </form>
            <div className="flex items-center gap-2">
              <Button asChild type={'text'}>
                <Link href={`/project/${projectRef}/settings/warehouse`}>Access tokens</Link>
              </Button>

              <TestCollectionDialog
                accessTokens={accessTokens.data?.data || []}
                collectionToken={collectionToken}
                projectRef={projectRef}
                collections={collections || []}
                open={testDialogOpen}
                onOpenChange={setTestDialogOpen}
              />
            </div>
          </div>

          {isError && (
            <div className="p-4">
              <AlertError subject="Failed to load query results" />
            </div>
          )}

          {!isError && (
            <LogTable
              collectionName={collection?.name}
              queryType="warehouse"
              hasEditorValue={false}
              projectRef={projectRef}
              isLoading={isLoading}
              data={results}
              params={params}
              maxHeight="calc(100vh - 139px)"
              showHeader={false}
              emptyState={
                <ProductEmptyState
                  title="Send your first event"
                  size="large"
                  ctaButtonLabel="Send test event"
                  onClickCta={() => setTestDialogOpen(true)}
                >
                  <>
                    <p>
                      This collection is ready, but no data has been received yet. <br />
                      Send your first event to start populating this collection.
                    </p>
                  </>
                </ProductEmptyState>
              }
            />
          )}
        </div>
      </LoadingOpacity>

      {!isError && (
        <div className="border-t flex flex-row justify-between p-2">
          <div className="flex items-center gap-2">
            {results.length > 0 && (
              <>
                <Button
                  onClick={loadMore}
                  icon={<Rewind />}
                  type="default"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Load more
                </Button>
              </>
            )}
            {filters.offset !== 0 && (
              <>
                <Button
                  onClick={() => setFilters({ ...filters, offset: 0 })}
                  type="default"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Load latest
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
