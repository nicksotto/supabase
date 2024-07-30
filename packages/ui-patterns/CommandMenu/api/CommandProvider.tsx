'use client'

import { useConstant } from 'common'
import { type PropsWithChildren, useEffect, useMemo, useCallback } from 'react'

import { CommandContext } from '../internal/Context'
import { initCommandsState } from '../internal/state/commandsState'
import { initPagesState } from '../internal/state/pagesState'
import { initQueryState } from '../internal/state/queryState'
import { initViewState } from '../internal/state/viewState'
import { useCrossCompatRouter } from './hooks/useCrossCompatRouter'
import { useSetCommandMenuOpen, useToggleCommandMenu } from './hooks/viewHooks'

const CommandProviderInternal = ({ children }: PropsWithChildren) => {
  const combinedState = useConstant(() => ({
    commandsState: initCommandsState(),
    pagesState: initPagesState(),
    queryState: initQueryState(),
    viewState: initViewState(),
  }))

  return <CommandContext.Provider value={combinedState}>{children}</CommandContext.Provider>
}

// This is a component not a hook so it can access the wrapping context.
const CommandShortcut = ({ openKey }: { openKey: string }) => {
  const toggleOpen = useToggleCommandMenu()

  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (openKey === '') return

      if (evt.key === openKey && evt.metaKey) {
        evt.preventDefault()
        toggleOpen()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [toggleOpen])

  return null
}

// This is a component not a hook so it can access the wrapping context.
function CloseOnNavigation() {
  const setIsOpen = useSetCommandMenuOpen()
  const router = useCrossCompatRouter()

  const completeNavigation = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEffect(() => {
    router.events.onRouteChangeComplete(completeNavigation)
    return () => router.events.offRouteChangeComplete(completeNavigation)
  }, [router])

  return null
}

interface CommandProviderProps extends PropsWithChildren {
  /**
   * The keyboard shortcut that opens the command menu when used in
   * combination with the meta key.
   *
   * Defaults to `k`. Pass an empty string to disable the keyboard shortcut.
   */
  openKey?: string
}

const CommandProvider = ({ children, openKey }: CommandProviderProps) => (
  <CommandProviderInternal>
    <CommandShortcut openKey={openKey ?? 'k'} />
    <CloseOnNavigation />
    {children}
  </CommandProviderInternal>
)

export { CommandProvider }
