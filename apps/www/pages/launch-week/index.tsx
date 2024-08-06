import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Session } from '@supabase/supabase-js'
import { LW12_DATE, LW12_TITLE, LW_URL, SITE_ORIGIN } from '~/lib/constants'
import supabase from '~/lib/supabaseMisc'

import DefaultLayout from '~/components/Layouts/Default'
import { TicketState, ConfDataContext, UserData } from '~/components/LaunchWeek/hooks/use-conf-data'
import SectionContainer from '~/components/Layouts/SectionContainer'
import { Meetup } from '~/components/LaunchWeek/12/LWMeetups'
import LWStickyNav from '~/components/LaunchWeek/12/Releases/LWStickyNav'
import LWHeader from '~/components/LaunchWeek/12/Releases/LWHeader'
import MainStage from '~/components/LaunchWeek/12/Releases/MainStage'
import { cn } from 'ui'
import LW12Background from '../../components/LaunchWeek/12/LW12Background'
import useLwGame from '../../components/LaunchWeek/hooks/useLwGame'

const BuildStage = dynamic(() => import('~/components/LaunchWeek/12/Releases/BuildStage'))
const LW12Meetups = dynamic(() => import('~/components/LaunchWeek/12/LWMeetups'))
const TicketingFlow = dynamic(() => import('~/components/LaunchWeek/12/Ticket/TicketingFlow'))
const LaunchWeekPrizeSection = dynamic(
  () => import('~/components/LaunchWeek/12/LaunchWeekPrizeSection')
)

interface Props {
  meetups?: Meetup[]
}

export default function LaunchWeekIndex({ meetups }: Props) {
  const { query } = useRouter()

  const TITLE = `${LW12_TITLE} | ${LW12_DATE}`
  const DESCRIPTION = 'Join us for a week of announcing new features, every day at 7 AM PT.'
  const OG_IMAGE = `${SITE_ORIGIN}/images/launchweek/12/lw12-og.png?lw=12`

  const ticketNumber = query.ticketNumber?.toString()
  const [session, setSession] = useState<Session | null>(null)
  const [showCustomizationForm, setShowCustomizationForm] = useState<boolean>(false)

  const defaultUserData = {
    id: query.id?.toString(),
    ticket_number: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
    platinum: !!query.platinum,
  }

  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [ticketState, setTicketState] = useState<TicketState>('loading')
  const { isGameMode, setIsGameMode } = useLwGame(ticketState !== 'ticket' || showCustomizationForm)
  const hasTicket = !isGameMode && ticketState === 'ticket'

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (session?.user) {
      if (userData?.id) {
        return setTicketState('ticket')
      }
      return setTicketState('loading')
    }
    if (!session) return setTicketState('registration')
  }, [session, userData])

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: LW_URL,
          images: [
            {
              url: OG_IMAGE,
            },
          ],
        }}
      />
      <ConfDataContext.Provider
        value={{
          supabase,
          session,
          userData,
          setUserData,
          ticketState,
          setTicketState,
          showCustomizationForm,
          setShowCustomizationForm,
        }}
      >
        <DefaultLayout
          className="
            relative
            -mt-[60px] pt-[60px]
            overflow-hidden
            "
        >
          <LW12Background
            className={cn(
              'opacity-100 transition-opacity max-h-[476px] overflow-hidden',
              hasTicket || (isGameMode && 'opacity-80 dark:opacity-60')
            )}
          />
          <LWStickyNav />
          <LWHeader className="pb-20" />
          <MainStage className="relative -mt-20 z-10" />
          <BuildStage />
          <SectionContainer id="meetups" className="scroll-mt-[66px]">
            <LW12Meetups meetups={meetups} />
          </SectionContainer>
          <SectionContainer className="!pb-8" id="ticket">
            <TicketingFlow />
          </SectionContainer>
          <SectionContainer className="lg:pb-40" id="awards">
            <LaunchWeekPrizeSection />
          </SectionContainer>
        </DefaultLayout>
      </ConfDataContext.Provider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: meetups } = await supabase!
    .from('meetups')
    .select('*')
    .eq('launch_week', 'lw12')
    .neq('isPublished', false)
    .order('date', { ascending: false })

  return {
    props: {
      meetups,
    },
  }
}
