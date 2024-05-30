import { currentUser } from '@/data/auth'
import { getPlan } from '@/data/plan'
import { getReservation } from '@/data/reservation'
import { getStreamer } from '@/data/streamer'
import { addHour, date, format } from '@formkit/tempo'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReviewForm } from './components/ReviewForm'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await currentUser()
  if (!user) redirect('/signin')

  const reservation = await getReservation(Number(searchParams.reservationId))
  const streamer = await getStreamer(reservation.streamer_id)
  const plan = await getPlan(reservation.plan_id)

  const startDateTime = format(
    date(reservation.start_date_dime),
    'YYYY/MM/DD hh:mm',
    'ja',
  )
  const endDateTime = format(
    addHour(date(reservation.start_date_dime), 1),
    'YYYY/MM/DD hh:mm',
    'ja',
  )

  return (
    <div className='container mx-auto'>
      <div className='mb-8 mt-12'>
        <Link href='/users/mypage' className='text-game-gray-300'>
          ← マイページに戻る
        </Link>
      </div>
      <div className='flex flex-col items-center space-y-6'>
        <p className='text-2xl text-game-white'>
          {streamer.name}さんのレビューをしてください
        </p>
        <p className='text-game-white'>遊んだプラン: {plan.name}</p>
        <p className='text-game-white'>
          遊んだ日時: {startDateTime} ~ {endDateTime}
        </p>
        <ReviewForm
          userId={user.id}
          streamerId={streamer.id}
          planId={plan.id}
        />
      </div>
    </div>
  )
}
