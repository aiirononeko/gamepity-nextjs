import { getOneWeekDateTimes } from '@/app/streamers/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import type { Metadata } from 'next'
import Link from 'next/link'
import AvailableDateTimeTable from './components/AvailableDateTimeTable'

export const metadata: Metadata = {
  title: '予約日時選択 | Gamepity',
  description: '予約日時選択ページ',
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const plan = await getPlan(Number(searchParams.planId))
  const streamer = await getStreamer(plan.streamer_id)
  const availableDateTimes = await getAvailableDateTimes(plan.streamer_id)
  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>トップ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/streamers/${streamer.id}`}>ストリーマー詳細</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>予約日時選択</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>予約する日時を選択してください</h2>
      <AvailableDateTimeTable
        availableDateTimes={availableDateTimes}
        oneWeekDateTimes={oneWeekDateTimes}
        plan={plan}
      />
    </div>
  )
}
