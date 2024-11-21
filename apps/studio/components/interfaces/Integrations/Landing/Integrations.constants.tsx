import { Clock5, Layers, Vault, Webhook } from 'lucide-react'
import Image from 'next/image'
import { ComponentType, ReactNode } from 'react'

import { WRAPPERS } from 'components/interfaces/Database/Wrappers/Wrappers.constants'
import { WrapperMeta } from 'components/interfaces/Database/Wrappers/Wrappers.types'
import { GenericSkeletonLoader } from 'components/ui/ShimmeringLoader'
import { BASE_PATH } from 'lib/constants'
import dynamic from 'next/dynamic'
import { cn } from 'ui'

export type Navigation = {
  route: string
  label: string
  hasChild?: boolean
  childIcon?: React.ReactNode
  children?: Navigation[]
}

const Loading = () => (
  <div className="p-10">
    <GenericSkeletonLoader />
  </div>
)

export type IntegrationDefinition = {
  id: string
  name: string
  beta?: boolean
  icon: (props?: { className?: string; style?: Record<string, any> }) => ReactNode
  description: string
  docsUrl: string
  author: {
    name: string
    websiteUrl: string
  }
  navigation?: Navigation[]
  navigate: (
    id: string,
    pageId: string | undefined,
    childId: string | undefined
  ) => ComponentType<{}> | null
} & (
  | { type: 'wrapper'; meta: WrapperMeta }
  | { type: 'postgres_extension'; requiredExtensions: string[] }
  | { type: 'custom' }
)

const authorSupabase = {
  name: 'Supabase',
  websiteUrl: 'https://supabase.com',
}

const supabaseIntegrations: IntegrationDefinition[] = [
  {
    id: 'queues',
    type: 'postgres_extension' as const,
    requiredExtensions: ['pgmq'],
    name: `Queues`,
    icon: ({ className, ...props } = {}) => (
      <Layers className={cn('inset-0 p-2 text-background w-full h-full', className)} {...props} />
    ),
    description: 'Lightweight message queue in Postgres',
    docsUrl: 'https://github.com/tembo-io/pgmq',
    author: {
      name: 'pgmq',
      websiteUrl: 'https://github.com/tembo-io/pgmq',
    },
    navigation: [
      {
        route: 'overview',
        label: 'Overview',
      },
      {
        route: 'queues',
        label: 'Queues',
        hasChild: true,
        childIcon: (
          <Layers size={12} strokeWidth={1.5} className={cn('text-foreground w-full h-full')} />
        ),
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      if (childId) {
        return dynamic(
          () =>
            import('components/interfaces/Integrations/NewQueues/QueueTab').then(
              (mod) => mod.QueueTab
            ),
          {
            loading: Loading,
          }
        )
      }
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Integration/IntegrationOverviewTab').then(
                (mod) => mod.IntegrationOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'queues':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/NewQueues/QueuesTab').then(
                (mod) => mod.QueuesTab
              ),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  },
  {
    id: 'cron-jobs',
    type: 'postgres_extension' as const,
    requiredExtensions: ['pg_cron'],
    name: `Cron Jobs`,
    icon: ({ className, ...props } = {}) => (
      <Clock5 className={cn('inset-0 p-2 text-background w-full h-full', className)} {...props} />
    ),
    description: 'Schedule and automate tasks to run maintenance routines at specified intervals.',
    docsUrl: 'https://github.com/citusdata/pg_cron',
    author: {
      name: 'pg_cron',
      websiteUrl: 'https://github.com/citusdata/pg_cron',
    },
    navigation: [
      {
        route: 'overview',
        label: 'Overview',
      },
      {
        route: 'cron-jobs',
        label: 'Cron Jobs',
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Integration/IntegrationOverviewTab').then(
                (mod) => mod.IntegrationOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'cron-jobs':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/NewCronJobs/CronjobsTab').then(
                (mod) => mod.CronjobsTab
              ),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  },
  {
    id: 'vault',
    type: 'postgres_extension' as const,
    requiredExtensions: ['supabase_vault'],
    name: `Vault`,
    beta: true,
    icon: ({ className, ...props } = {}) => (
      <Vault className={cn('inset-0 p-2 text-background w-full h-full', className)} {...props} />
    ),
    description: 'Application level encryption for your project',
    docsUrl: 'https://supabase.com/docs',
    author: authorSupabase,
    navigation: [
      {
        route: 'overview',
        label: 'Overview',
      },
      {
        route: 'keys',
        label: 'Keys',
      },
      {
        route: 'secrets',
        label: 'Secrets',
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Integration/IntegrationOverviewTab').then(
                (mod) => mod.IntegrationOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'keys':
          return dynamic(
            () =>
              import('components/interfaces/Settings/Vault').then(
                (mod) => mod.EncryptionKeysManagement
              ),
            {
              loading: Loading,
            }
          )
        case 'secrets':
          return dynamic(
            () =>
              import('components/interfaces/Settings/Vault').then((mod) => mod.SecretsManagement),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  },
  {
    id: 'webhooks',
    type: 'custom' as const,
    name: `Webhooks`,
    icon: ({ className, ...props } = {}) => (
      <Webhook className={cn('inset-0 p-2 text-background w-full h-full', className)} {...props} />
    ),
    description:
      'Send real-time data from your database to another system when a table event occurs',
    docsUrl: 'https://supabase.com/docs',
    author: authorSupabase,
    navigation: [
      {
        route: 'overview',
        label: 'Overview',
      },
      {
        route: 'webhooks',
        label: 'Webhooks',
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Webhooks/OverviewTab').then(
                (mod) => mod.WebhooksOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'webhooks':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Webhooks/ListTab').then(
                (mod) => mod.WebhooksListTab
              ),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  },
  {
    id: 'graphiql',
    type: 'postgres_extension' as const,
    requiredExtensions: ['pg_graphql'],
    name: `GraphiQL`,
    icon: ({ className, ...props } = {}) => (
      <Image
        fill
        src={`${BASE_PATH}/img/graphql.svg`}
        alt="GraphiQL"
        className={cn('p-2', className)}
        {...props}
      />
    ),
    description: 'Run GraphQL queries through our interactive in-browser IDE',
    docsUrl: 'https://supabase.com/docs',
    author: authorSupabase,
    navigation: [
      {
        route: 'overview',
        label: 'Overview',
      },
      {
        route: 'graphiql',
        label: 'GraphiQL',
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Integration/IntegrationOverviewTab').then(
                (mod) => mod.IntegrationOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'graphiql':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/GraphQL/GraphiQLTab').then(
                (mod) => mod.GraphiQLTab
              ),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  },
] as const

const wrapperIntegrations: IntegrationDefinition[] = WRAPPERS.map((w) => {
  return {
    id: w.name,
    type: 'wrapper' as const,
    name: `${w.label} Wrapper`,
    icon: ({ className, ...props } = {}) => (
      <Image fill src={w.icon} alt={w.name} className={cn('p-2', className)} {...props} />
    ),
    description: w.description,
    docsUrl: w.docsUrl,
    meta: w,
    author: authorSupabase,
    navigation: [
      {
        route: `overview`,
        label: 'Overview',
      },
      {
        route: `wrappers`,
        label: 'Wrappers',
      },
    ],
    navigate: (id: string, pageId: string = 'overview', childId: string | undefined) => {
      switch (pageId) {
        case 'overview':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Wrappers/OverviewTab').then(
                (mod) => mod.WrapperOverviewTab
              ),
            {
              loading: Loading,
            }
          )
        case 'wrappers':
          return dynamic(
            () =>
              import('components/interfaces/Integrations/Wrappers/WrappersTab').then(
                (mod) => mod.WrappersTab
              ),
            {
              loading: Loading,
            }
          )
      }
      return null
    },
  }
})

export const INTEGRATIONS: IntegrationDefinition[] = [
  ...wrapperIntegrations,
  ...supabaseIntegrations,
]
