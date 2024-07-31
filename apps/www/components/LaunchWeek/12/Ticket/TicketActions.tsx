import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import NextImage from 'next/image'
import Link from 'next/link'
import { LW_URL, TWEET_TEXT, TWEET_TEXT_PLATINUM, TWEET_TEXT_SECRET } from '~/lib/constants'
import { Button, cn } from 'ui'
import { useParams } from '~/hooks/useParams'
import LaunchWeekPrizeCard from '../LaunchWeekPrizeCard'
import TicketCopy from './TicketCopy'
import useConfData from '~/components/LaunchWeek/hooks/use-conf-data'

export default function TicketActions() {
  const { userData, supabase } = useConfData()
  const { platinum, username, metadata, secret: hasSecretTicket } = userData
  const [_imgReady, setImgReady] = useState(false)
  const [_loading, setLoading] = useState(false)
  const downloadLink = useRef<HTMLAnchorElement>()
  const link = `${LW_URL}/tickets/${username}?lw=12${
    hasSecretTicket ? '&secret=true' : platinum ? `&platinum=true` : ''
  }&t=${dayjs(new Date()).format('DHHmmss')}`
  const permalink = encodeURIComponent(link)
  const text = hasSecretTicket ? TWEET_TEXT_SECRET : platinum ? TWEET_TEXT_PLATINUM : TWEET_TEXT
  const encodedText = encodeURIComponent(text)
  const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&text=${encodedText}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`
  const downloadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/lw12-og?username=${encodeURIComponent(
    username ?? ''
  )}`
  const params = useParams()
  const sharePage = !!params.username
  const TICKETS_TABLE = 'tickets'

  useEffect(() => {
    setImgReady(false)

    const img = new Image()

    img.src = downloadUrl
    img.onload = () => {
      setImgReady(true)
      setLoading(false)
      if (downloadLink.current) {
        downloadLink.current.click()
        downloadLink.current = undefined
      }
    }
  }, [downloadUrl])

  const handleShare = async (social: 'twitter' | 'linkedin') => {
    if (!supabase) return

    setTimeout(async () => {
      if (social === 'twitter') {
        await supabase
          .from(TICKETS_TABLE)
          .update({
            shared_on_twitter: 'now',
            metadata: { ...metadata, hasSharedSecret: hasSecretTicket },
          })
          .eq('launch_week', 'lw12')
          .eq('username', username)
      } else if (social === 'linkedin') {
        await supabase
          .from(TICKETS_TABLE)
          .update({
            shared_on_linkedin: 'now',
            metadata: { ...metadata, hasSharedSecret: hasSecretTicket },
          })
          .eq('launch_week', 'lw12')
          .eq('username', username)
      }
    })
  }

  return (
    <div className="bg-surface-75 border border-muted w-full h-auto flex flex-col lg:flex-row rounded-lg overflow-hidden gap-3 items-center pr-12">
      <div className="relative flex items-center justify-center h-auto w-full lg:w-2/5 object-center border-b lg:border-none border-muted overflow-hidden">
        <NextImage
          src="/images/launchweek/12/lw12-backpack-crop.png"
          alt="Supabase LW12 Wandrd backpack"
          draggable={false}
          width={300}
          height={300}
          className="object-cover lg:object-top mx-auto inset-x-0 w-auto h-full opacity-90 dark:opacity-50 pointer-events-none"
        />
      </div>
      <p className="text-foreground-light text-sm">
        Boost your chances of winning Supabase LW12 Wandrd backpack and other awards.
      </p>
    </div>
  )
}
