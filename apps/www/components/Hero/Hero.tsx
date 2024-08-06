import Link from 'next/link'
import { useRouter } from 'next/router'
import Telemetry, { TelemetryEvent } from '~/lib/telemetry'
import { useTelemetryProps } from 'common/hooks/useTelemetryProps'
import gaEvents from '~/lib/gaEvents'
import { Button, cn, IconBookOpen } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import AnnouncementBadge from '~/components/Announcement/Badge'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Pagination, A11y } from 'swiper/modules'

SwiperCore.use([A11y, Navigation, Pagination])

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import HeroAnnouncement from './HeroAnnouncement'

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [apiSwiper, setApiSwiper] = useState(undefined)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const router = useRouter()
  const telemetryProps = useTelemetryProps()
  const sendTelemetryEvent = async (event: TelemetryEvent) => {
    await Telemetry.sendEvent(event, telemetryProps, router)
  }

  useEffect(() => {
    if (!apiSwiper) return
    // @ts-ignore
    apiSwiper.slideTo(activeTab)
  }, [activeTab])

  const slides = [
    <AnnouncementBadge
      url="/events/ai-engineer-summit-2024"
      badge="Webinar"
      announcement="AI Engineer Summit 2024"
    />,
    <AnnouncementBadge
      url="/launch-week"
      badge="Launch Week 12"
      announcement="Claim your ticket"
    />,
  ]

  return (
    <div className="relative -mt-[65px]">
      <SectionContainer className="pt-8 md:pt-16 overflow-hidden">
        <div className="relative">
          <div className="mx-auto">
            <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
              <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                <div className="flex flex-col items-center justify-center w-full">
                  <HeroAnnouncement />
                  <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-7xl">
                    <span className="block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-foreground to-foreground-light">
                      Build in a weekend
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#3ECF8E] via-[#3ECF8E] to-[#3ecfb2] block md:ml-0">
                      Scale to millions
                    </span>
                  </h1>
                  <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                    Supabase is an open source Firebase alternative.{' '}
                    <br className="hidden md:block" />
                    Start your project with a Postgres database, Authentication, instant APIs, Edge
                    Functions, Realtime subscriptions, Storage, and Vector embeddings.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="medium" className="text-white">
                    <Link
                      href="https://supabase.com/dashboard"
                      as="https://supabase.com/dashboard"
                      onClick={() => sendTelemetryEvent(gaEvents['www_hp_hero_startProject'])}
                    >
                      Start your project
                    </Link>
                  </Button>
                  <Button asChild size="medium" type="default" icon={<IconBookOpen />}>
                    <Link
                      href="/docs"
                      as="/docs"
                      onClick={() => sendTelemetryEvent(gaEvents['www_hp_hero_documentation'])}
                    >
                      Documentation
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default Hero
