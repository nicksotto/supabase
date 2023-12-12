import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { post } from 'data/fetchers'
import { ResponseError } from 'types'
import { databaseExtensionsKeys } from './keys'

export type DatabaseExtensionEnableVariables = {
  projectRef: string
  connectionString: string
  schema: string
  name: string
  version: string
  cascade?: boolean
}

export async function enableDatabaseExtension({
  projectRef,
  connectionString,
  schema,
  name,
  version,
  cascade = false,
}: DatabaseExtensionEnableVariables) {
  let headers = new Headers()
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await post('/platform/pg-meta/{ref}/extensions', {
    params: {
      header: { 'x-connection-encrypted': connectionString },
      path: { ref: projectRef },
    },
    body: { schema, name, version, cascade },
    headers: Object.fromEntries(headers),
  })

  if (error) throw error
  return data
}

type DatabaseExtensionEnableData = Awaited<ReturnType<typeof enableDatabaseExtension>>

export const useDatabaseExtensionEnableMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<DatabaseExtensionEnableData, ResponseError, DatabaseExtensionEnableVariables>,
  'mutationFn'
> = {}) => {
  const queryClient = useQueryClient()

  return useMutation<DatabaseExtensionEnableData, ResponseError, DatabaseExtensionEnableVariables>(
    (vars) => enableDatabaseExtension(vars),
    {
      async onSuccess(data, variables, context) {
        const { projectRef } = variables
        await queryClient.invalidateQueries(databaseExtensionsKeys.list(projectRef))
        await onSuccess?.(data, variables, context)
      },
      async onError(data, variables, context) {
        if (onError === undefined) {
          toast.error(`Failed to enable database extension: ${data.message}`)
        } else {
          onError(data, variables, context)
        }
      },
      ...options,
    }
  )
}
