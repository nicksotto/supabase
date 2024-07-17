'use client'

import { User } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { useBreakpoint } from 'common'
import {
  AiIconAnimation,
  Button,
  CommandGroup_Shadcn_,
  CommandItem_Shadcn_,
  cn,
  markdownComponents,
} from 'ui'

import { StatusIcon } from '../../../Icons/StatusIcons'
import {
  Breadcrumb,
  CommandHeader,
  CommandInput,
  CommandWrapper,
  generateCommandClassNames,
  useHistoryKeys,
  useQuery,
  useSetCommandMenuSize,
  useSetQuery,
} from '../..'
import { AiWarning, Message, MessageRole, MessageStatus, useAiChat } from '../ai'

const questions = [
  'How do I get started with Supabase?',
  'How do I run Supabase locally?',
  'How do I connect to my database?',
  'How do I run migrations? ',
  'How do I listen to changes in a table?',
  'How do I set up authentication?',
]

const DocsAiPage = () => {
  const query = useQuery()
  const setQuery = useSetQuery()

  const isBelowSm = useBreakpoint('sm')

  /**
   * Interface for AI interaction is larger to allow more reading space.
   */
  useSetCommandMenuSize('xlarge')

  const [isLoading, setIsLoading] = useState(false)

  const { submit, reset, messages, isResponding, hasError } = useAiChat({
    setIsLoading,
  })

  useHistoryKeys({
    enable: !isResponding,
    stack: messages.filter(({ role }) => role === MessageRole.User).map(({ content }) => content),
  })

  const handleSubmit = useCallback(
    (message: string) => {
      setQuery('')
      submit(message)
    },
    [submit]
  )

  const handleReset = useCallback(() => {
    setQuery('')
    reset()
  }, [reset])

  useEffect(() => {
    if (query) {
      handleSubmit(query)
    }
  }, [])

  return (
    <CommandWrapper
      className={cn(
        'flex flex-col',
        !isBelowSm &&
          '[&_[cmdk-input-wrapper]]:border-b-0 [&_[cmdk-input-wrapper]]:border-t [&_[cmdk-input-wrapper]]:border-solid [&_[cmdk-input-wrapper]]:border-bg-control'
      )}
    >
      {isBelowSm && (
        <PromptInput
          submit={submit}
          messages={messages}
          isLoading={isLoading}
          isResponding={isResponding}
        />
      )}
      <div className={cn('flex-grow min-h-0 overflow-auto p-4')}>
        {!hasError && messages.length > 0 && <AiMessages messages={messages} />}
        {messages.length === 0 && !hasError && <EmptyState handleSubmit={handleSubmit} />}

        {hasError && (
          <div className="p-6 flex flex-col items-center gap-2 mt-4">
            <StatusIcon variant="warning" />
            <p className="text-sm text-foreground text-center">
              Sorry, looks like Supabase AI is having a hard time!
            </p>
            <p className="text-sm text-foreground-lighter text-center">
              Please try again in a bit.
            </p>
            <Button size="tiny" type="default" onClick={handleReset}>
              Try again?
            </Button>
          </div>
        )}
      </div>

      {!isBelowSm && (
        <PromptInput
          submit={submit}
          messages={messages}
          isLoading={isLoading}
          isResponding={isResponding}
        />
      )}
      {messages.length > 0 && !hasError && (
        <AiWarning className={isBelowSm ? 'rounded-b-none' : 'rounded-t-none'} />
      )}
    </CommandWrapper>
  )
}

function PromptInput({
  submit,
  messages,
  isLoading,
  isResponding,
  className,
}: {
  submit: (query: string) => Promise<void>
  messages: Array<Message>
  isLoading: boolean
  isResponding: boolean
  className?: string
}) {
  const query = useQuery()
  const setQuery = useSetQuery()

  const isBelowSm = useBreakpoint('sm')

  useHistoryKeys({
    enable: !isResponding,
    stack: messages.filter(({ role }) => role === MessageRole.User).map(({ content }) => content),
  })

  const handleSubmit = useCallback(
    (message: string) => {
      setQuery('')
      submit(message)
    },
    [submit]
  )

  useEffect(() => {
    if (query) {
      handleSubmit(query)
    }
  }, [])

  // Detect an IME composition (so that we can ignore Enter keypress)
  const [isImeComposing, setIsImeComposing] = useState(false)

  return (
    <CommandHeader>
      <Breadcrumb />
      <CommandInput
        className={cn(
          'w-full h-11',
          'border-none outline-none bg-transparent rounded-none rounded-t-md px-4 py-7',
          'flex',
          'text-base text-foreground-light',
          'focus:ring-0 focus:shadow-none focus:ring-transparent',
          'focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-transparent',
          'placeholder:text-foreground-muted',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        placeholder={
          isLoading || isResponding ? 'Waiting on an answer...' : 'Ask Supabase AI a question...'
        }
        value={query}
        onCompositionStart={() => setIsImeComposing(true)}
        onCompositionEnd={() => setIsImeComposing(false)}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Enter':
              if (!query || isLoading || isResponding || isImeComposing) {
                return
              }
              return handleSubmit(query)
            default:
              return
          }
        }}
      />
    </CommandHeader>
  )
}

function AiMessages({ messages }: { messages: Array<Message> }) {
  return (
    <div
      className={cn(
        'flex-grow min-h-0 overflow-auto p-4',
        'grid gap-6 md:grid-cols-[max-content,1fr] grid-rows-[max-content]'
      )}
    >
      {messages.map((message, index) => {
        switch (message.role) {
          case MessageRole.User:
            return (
              <Fragment key={index}>
                <div className="flex items-center gap-4 [overflow-anchor:none]">
                  <div
                    className={cn(
                      'w-7 h-7',
                      'border border-muted bg-background shadow-sm rounded-full',
                      'flex items-center justify-center',
                      'text-foreground-lighter'
                    )}
                  >
                    <User strokeWidth={1.5} size={16} />
                  </div>
                  <span className="font-mono text-sm text-foreground-muted uppercase tracking-widest md:hidden">
                    You
                  </span>
                </div>
                <div className="prose text-foreground-lighter [overflow-anchor:none]">
                  {message.content}
                </div>
              </Fragment>
            )
          case MessageRole.Assistant:
            return (
              <Fragment key={index}>
                <div className="flex items-center md:items-start gap-4 [overflow-anchor:none]">
                  <AiIconAnimation
                    className="ml-0.5"
                    loading={
                      message.status === MessageStatus.Pending ||
                      message.status === MessageStatus.InProgress
                    }
                    allowHoverEffect
                  />
                  <span className="font-mono text-sm text-foreground-muted uppercase tracking-widest md:hidden">
                    Supabase AI
                  </span>
                </div>
                <div className="[overflow-anchor:none]">
                  {message.status === MessageStatus.Pending && (
                    <div className="h-[1lh] w-[0.8lh] mt-1 bg-border-strong animate-bounce" />
                  )}
                  {message.status === MessageStatus.Complete && (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ...markdownComponents,
                        a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                      }}
                      className="prose dark:prose-dark break-words"
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </Fragment>
            )
        }
      })}
    </div>
  )
}

function EmptyState({ handleSubmit }: { handleSubmit: (message: string) => void }) {
  const query = useQuery()

  return (
    <CommandGroup_Shadcn_
      heading="Examples"
      className={cn(
        'text-border-strong',
        '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5',
        '[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-foreground-muted'
      )}
    >
      {questions.map((question) => {
        const key = question.replace(/\s+/g, '_')
        return (
          <CommandItem_Shadcn_
            className={generateCommandClassNames(false)}
            onSelect={() => {
              if (!query) {
                handleSubmit(question)
              }
            }}
            key={key}
          >
            <AiIconAnimation />
            {question}
          </CommandItem_Shadcn_>
        )
      })}
    </CommandGroup_Shadcn_>
  )
}

export { DocsAiPage }
