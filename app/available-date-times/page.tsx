import {
  createLinkToStripeAccountUrl,
  hasDetailsSubmittedToStripe,
} from '@/actions/stripe'
import { getOneWeekDateTimes } from '@/app/streamers/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { currentUser, isStreamer } from '@/data/auth'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getStreamer } from '@/data/streamer'
import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AvailableDateTimeForm from './components/AvailableDateTimeForm'

export const metadata: Metadata = {
  title: '予約可能日時管理 | Gamepity',
  description: '予約可能日時管理ページ',
}

export default async function Page() {
  const user = await currentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const streamer = await getStreamer(user.id)
  const hasSubmittedDetails = await hasDetailsSubmittedToStripe(
    streamer.stripe_account_id,
  )

  const accountLinkUrl = await createLinkToStripeAccountUrl(
    streamer.stripe_account_id ?? '',
  )

  const availableDateTimes = await getAvailableDateTimes(streamer.id)
  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>予約可能日時管理</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>予約可能日時管理</h2>
      {hasSubmittedDetails ? (
        <AvailableDateTimeForm
          availableDateTimes={availableDateTimes}
          oneWeekDateTimes={oneWeekDateTimes}
          streamerId={streamer.id}
        />
      ) : (
        <div className='space-y-6'>
          <p className='text-md text-center md:text-start'>
            Stripeでビジネス情報を登録してください
          </p>
          <Button className='w-80 md:w-60' asChild>
            <a href={accountLinkUrl} target='_blank'>
              ビジネス情報を登録する <ExternalLink className='ml-1 size-4' />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
