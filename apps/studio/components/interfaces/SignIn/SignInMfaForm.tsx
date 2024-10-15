import type { Factor } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { object, string } from 'yup'

import AlertError from 'components/ui/AlertError'
import { GenericSkeletonLoader } from 'components/ui/ShimmeringLoader'
import { useMfaChallengeAndVerifyMutation } from 'data/profile/mfa-challenge-and-verify-mutation'
import { useMfaListFactorsQuery } from 'data/profile/mfa-list-factors-query'
import { useSendEventMutation } from 'data/telemetry/send-event-mutation'
import { useSignOut } from 'lib/auth'
import { getReturnToPath } from 'lib/gotrue'
import { Button, Form, Input } from 'ui'

const signInSchema = object({
  code: string().required('MFA Code is required'),
})

const SignInMfaForm = () => {
  const router = useRouter()
  const signOut = useSignOut()
  const queryClient = useQueryClient()
  const [selectedFactor, setSelectedFactor] = useState<Factor | null>(null)

  const { mutate: sendEvent } = useSendEventMutation()

  const {
    data: factors,
    error: factorsError,
    isError: isErrorFactors,
    isSuccess: isSuccessFactors,
    isLoading: isLoadingFactors,
  } = useMfaListFactorsQuery()
  const {
    mutate: mfaChallengeAndVerify,
    isLoading: isVerifying,
    isSuccess,
  } = useMfaChallengeAndVerifyMutation({
    onSuccess: async () => {
      sendEvent({ action: 'sign_in' })
      await queryClient.resetQueries()
      router.push(getReturnToPath())
    },
  })

  const onClickLogout = async () => {
    await signOut()
    await router.replace('/sign-in')
  }

  const onSignIn = async ({ code }: { code: string }) => {
    if (selectedFactor) {
      mfaChallengeAndVerify({ factorId: selectedFactor.id, code, refreshFactors: false })
    }
  }

  useEffect(() => {
    if (isSuccessFactors) {
      // if the user wanders into this page and he has no MFA setup, send the user to the next screen
      if (factors.totp.length === 0) {
        queryClient.resetQueries().then(() => router.push(getReturnToPath()))
      }
      if (factors.totp.length > 0) {
        setSelectedFactor(factors.totp[0])
      }
    }
  }, [factors?.totp, isSuccessFactors, router, queryClient])

  return (
    <>
      {isLoadingFactors && <GenericSkeletonLoader />}

      {isErrorFactors && <AlertError error={factorsError} subject="Failed to retrieve factors" />}

      {isSuccessFactors && (
        <Form
          validateOnBlur
          id="sign-in-mfa-form"
          initialValues={{ code: '' }}
          validationSchema={signInSchema}
          onSubmit={onSignIn}
        >
          {() => (
            <>
              <div className="flex flex-col gap-4">
                <Input
                  id="code"
                  name="code"
                  type="text"
                  autoFocus
                  icon={<Lock />}
                  placeholder="XXXXXX"
                  disabled={isVerifying}
                  autoComplete="off"
                  spellCheck="false"
                  autoCapitalize="none"
                  autoCorrect="off"
                  label={
                    selectedFactor && factors?.totp.length === 2
                      ? `Code generated by ${selectedFactor.friendly_name}`
                      : null
                  }
                />

                <div className="flex items-center justify-between space-x-2">
                  <Button
                    block
                    type="outline"
                    size="large"
                    disabled={isVerifying || isSuccess}
                    onClick={onClickLogout}
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    Cancel
                  </Button>
                  <Button
                    block
                    form="sign-in-mfa-form"
                    htmlType="submit"
                    size="large"
                    disabled={isVerifying || isSuccess}
                    loading={isVerifying || isSuccess}
                  >
                    {isVerifying ? 'Verifying' : isSuccess ? 'Signing in' : 'Verify'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Form>
      )}

      <div className="my-8">
        <div className="text-sm">
          <span className="text-foreground-light">Unable to sign in?</span>{' '}
        </div>
        <ul className="list-disc pl-6">
          {factors?.totp.length === 2 && (
            <li>
              <a
                className="text-sm text-foreground-light hover:text-foreground cursor-pointer"
                onClick={() =>
                  setSelectedFactor(factors.totp.find((f) => f.id !== selectedFactor?.id)!)
                }
              >{`Authenticate using ${factors.totp.find((f) => f.id !== selectedFactor?.id)
                ?.friendly_name}?`}</a>
            </li>
          )}
          <li>
            <Link
              target="_blank"
              rel="noreferrer"
              href="/support/new?subject=Unable+to+sign+in+via+MFA&category=Login_issues"
              className="text-sm transition text-foreground-light hover:text-foreground"
            >
              Reach out to us via support
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SignInMfaForm
