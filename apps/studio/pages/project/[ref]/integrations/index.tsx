import { AvailableIntegrations } from 'components/interfaces/Integrations/Landing/AvailableIntegrations'
import { InstalledIntegrations } from 'components/interfaces/Integrations/Landing/InstalledIntegrations'
import IntegrationsLayout from 'components/layouts/Integrations/layout'
import type { NextPageWithLayout } from 'types'
import { Separator } from 'ui'

const IntegrationsPage: NextPageWithLayout = () => {
  return (
    <div>
      <InstalledIntegrations />
      <Separator />
      <AvailableIntegrations />
    </div>
  )
}

IntegrationsPage.getLayout = (page) => {
  return <IntegrationsLayout>{page}</IntegrationsLayout>
}

export default IntegrationsPage
