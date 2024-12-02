import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'

import { get } from 'data/fetchers'
import { Content } from './content-query'
import { contentKeys } from './keys'

export type SqlSnippet = Extract<Content, { type: 'sql' }>

interface GetSqlSnippetsVariables {
  projectRef?: string
  cursor?: string
  visibility?: SqlSnippet['visibility']
  favorite?: boolean
}

export async function getSqlSnippets(
  { projectRef, cursor, visibility, favorite }: GetSqlSnippetsVariables,
  signal?: AbortSignal
) {
  if (typeof projectRef === 'undefined') {
    throw new Error('projectRef is required for getSqlSnippets')
  }

  const { data, error } = await get('/platform/projects/{ref}/content', {
    params: {
      path: { ref: projectRef },
      query: { type: 'sql', cursor, visibility, favorite, limit: '3' },
    },
    signal,
  })

  if (error) {
    throw error
  }

  return {
    cursor: data.cursor,
    contents: data.data as unknown as SqlSnippet[],
  }
}

export type SqlSnippetsData = Awaited<ReturnType<typeof getSqlSnippets>>
export type SqlSnippetsError = unknown

export const useSqlSnippetsQuery = <TData = SqlSnippetsData>(
  { projectRef, visibility, favorite }: Omit<GetSqlSnippetsVariables, 'cursor'>,
  {
    enabled = true,
    ...options
  }: UseInfiniteQueryOptions<SqlSnippetsData, SqlSnippetsError, TData> = {}
) =>
  useInfiniteQuery<SqlSnippetsData, SqlSnippetsError, TData>(
    contentKeys.sqlSnippets(projectRef, { visibility, favorite }),
    ({ signal, pageParam: cursor }) =>
      getSqlSnippets({ projectRef, cursor, visibility, favorite }, signal),
    {
      enabled: enabled && typeof projectRef !== 'undefined',
      getNextPageParam(lastPage) {
        return lastPage.cursor
      },
      ...options,
    }
  )
