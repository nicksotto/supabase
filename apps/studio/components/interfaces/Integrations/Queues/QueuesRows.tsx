import dayjs from 'dayjs'
import { includes, sortBy } from 'lodash'
import { ChevronRight } from 'lucide-react'

import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import Table from 'components/to-be-cleaned/Table'
import { PostgresQueueMetric } from 'data/database-queues/database-queues-metrics-query'
import { PostgresQueue } from 'data/database-queues/database-queues-query'
import { DATETIME_FORMAT } from 'lib/constants'
import { useRouter } from 'next/router'
import { DATE_FORMAT } from './SingleQueue/MessageDetailsPanel'

interface QueuesRowsProps {
  queues: PostgresQueue[]
  metrics: PostgresQueueMetric[] | undefined
  filterString: string
}

export const QueuesRows = ({ queues: fetchedQueues, metrics, filterString }: QueuesRowsProps) => {
  const router = useRouter()
  const { project: selectedProject } = useProjectContext()

  const filteredQueues = fetchedQueues.filter((x) =>
    includes(x.queue_name.toLowerCase(), filterString.toLowerCase())
  )
  const queues = sortBy(filteredQueues, (func) => func.queue_name.toLocaleLowerCase())

  if (queues.length === 0 && filterString.length > 0) {
    return (
      <Table.tr>
        <Table.td colSpan={4}>
          <p className="text-sm text-foreground">No results found</p>
          <p className="text-sm text-foreground-light">
            Your search for "{filterString}" did not return any results
          </p>
        </Table.td>
      </Table.tr>
    )
  }

  return (
    <>
      {queues.map((q) => {
        const type = q.is_partitioned ? 'Partitioned' : q.is_unlogged ? 'Unlogged' : 'Basic'

        const metric = metrics?.find((m) => m.queue_name === q.queue_name)

        return (
          <Table.tr
            key={q.queue_name}
            onClick={() => {
              router.push(`/project/${selectedProject?.ref}/integrations/queues/${q.queue_name}`)
            }}
            className="hover:"
          >
            <Table.td className="truncate">
              <p title={q.queue_name}>{q.queue_name}</p>
            </Table.td>
            <Table.td className="table-cell overflow-auto">
              <p title={type.toLocaleLowerCase()} className="truncate">
                {type}
              </p>
            </Table.td>
            <Table.td className="table-cell">
              <p title={q.created_at}>{dayjs(q.created_at).format(DATETIME_FORMAT)}</p>
            </Table.td>
            <Table.td className="table-cell">
              <p>{metric?.queue_length}</p>
            </Table.td>
            <Table.td className="table-cell">
              {metric?.newest_msg_age_sec ? (
                <p
                  title={dayjs().subtract(metric.newest_msg_age_sec, 'seconds').format(DATE_FORMAT)}
                >
                  {dayjs()
                    .subtract(metric?.newest_msg_age_sec, 'seconds')
                    .fromNow()}
                </p>
              ) : (
                'Never'
              )}
            </Table.td>
            <Table.td className="table-cell">
              {metric?.oldest_msg_age_sec ? (
                <p
                  title={dayjs().subtract(metric.oldest_msg_age_sec, 'seconds').format(DATE_FORMAT)}
                >
                  {dayjs()
                    .subtract(metric?.oldest_msg_age_sec, 'seconds')
                    .fromNow()}
                </p>
              ) : (
                'Never'
              )}
            </Table.td>
            <Table.td>
              <div className="flex items-center justify-end">
                <ChevronRight size="18" />
              </div>
            </Table.td>
          </Table.tr>
        )
      })}
    </>
  )
}
