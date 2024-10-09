import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { components } from 'api-types'

import { handleError, post } from 'data/fetchers'
import { useRouter } from 'next/router'
import type { ResponseError } from 'types'

type SendPageLeaveBody = components['schemas']['TelemetryPageLeaveBody']
export type SendPageLeaveVariables = {}

export async function sendPageLeave(body: SendPageLeaveBody) {
  const { data, error } = await post(`/platform/telemetry/page-leave`, {
    body,
    credentials: 'include',
  })
  if (error) handleError(error)
  return data
}

type SendPageLeaveData = Awaited<ReturnType<typeof sendPageLeave>>

export const useSendPageLeaveMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<SendPageLeaveData, ResponseError, SendPageLeaveVariables>,
  'mutationFn'
> = {}) => {
  const router = useRouter()
  const title = typeof document !== 'undefined' ? document?.title : ''

  const body = {
    page_url: window.location.href,
    page_title: title,
    pathname: router.pathname,
  } as SendPageLeaveBody

  return useMutation<SendPageLeaveData, ResponseError, SendPageLeaveVariables>(
    (vars) => sendPageLeave(body),
    {
      async onSuccess(data, variables, context) {
        await onSuccess?.(data, variables, context)
      },
      async onError(data, variables, context) {
        if (onError === undefined) {
          console.error(`Failed to send Telemetry page leave: ${data.message}`)
        } else {
          onError(data, variables, context)
        }
      },
      ...options,
    }
  )
}
