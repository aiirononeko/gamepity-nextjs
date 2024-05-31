import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser } from '@/data/auth'
import { getAvailableDateTime } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import { addHour, format } from '@formkit/tempo'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import ConfirmationForm from './components/ConfirmationForm'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await currentUser()
  if (!user) redirect('/signin')

  const plan = await getPlan(Number(searchParams.planId))
  const availableDateTime = await getAvailableDateTime(
    Number(searchParams.availableDateTimeId),
  )
  const streamer = await getStreamer(plan.streamer_id)

  const startDateTime = format({
    date: availableDateTime.start_date_time,
    format: 'YYYY/MM/DD hh:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  const endDateTime = format({
    date: addHour(availableDateTime.start_date_time, 1),
    format: 'YYYY/MM/DD hh:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-8 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/streamers/${streamer.id}/reservation?planId=${plan.id}`}
            >
              予約日時選択
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>予約内容確認</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>予約内容を確認してください</h2>
      <div className='space-y-8 md:w-full'>
        {streamer.icon_url ? (
          <div className='relative h-[220px] w-[352px]'>
            <Image
              alt={`${streamer.name}のアイコン`}
              src={streamer.icon_url}
              fill={true}
            />
          </div>
        ) : (
          <div className='h-[220px] w-[352px]'></div>
        )}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-md text-center font-bold md:text-start'>
              選択したストリーマー
            </h3>
            <p className='text-md text-center md:text-start'>{streamer.name}</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-md text-center font-bold md:text-start'>
              選択したプラン
            </h3>
            <p className='text-md text-center md:text-start'>{plan.name}</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-md text-center font-bold md:text-start'>
              選択した予約日時
            </h3>
            <p className='text-md text-center md:text-start'>
              {startDateTime} ~ {endDateTime}
            </p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-md text-center font-bold md:text-start'>
              お支払い金額
            </h3>
            <p className='text-md text-center md:text-start'>{plan.amount}円</p>
          </div>
        </div>
      </div>
      <ConfirmationForm
        availableDateTimeId={availableDateTime.id}
        startDateTime={availableDateTime.start_date_time}
        streamerId={streamer.id}
        userId={user.id}
        planId={plan.id}
        stripeAccountId={streamer.stripe_account_id ?? ''}
        stripePriceId={plan.stripe_price_id}
        streamerEmail={streamer.email}
        streamerDiscordUrl={streamer.discord_url ?? ''}
        userEmail={user.email ?? ''}
      />
    </div>
  )
}
