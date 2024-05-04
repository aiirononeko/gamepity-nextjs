import { redirect } from 'next/navigation'
import { ReviewForm } from './components/ReviewForm'
import { createReview } from '@/actions/review'
import { getCurrentUser } from '@/data/auth'
import { getPlan } from '@/data/plan'
import { getReservation } from '@/data/reservation'
import { getStreamer } from '@/data/streamer'
import { addHour, date, format } from '@formkit/tempo'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
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
    <div className='container mx-auto mt-10 flex flex-col space-y-8'>
      <p className='text-2xl text-game-white'>
        {streamer.name}さんのレビューをしてください
      </p>
      <p className='text-game-white'>遊んだプラン: {plan.name}</p>
      <p className='text-game-white'>
        遊んだ日時: {startDateTime} ~ {endDateTime}
      </p>
      <form action={createReview}>
        <ReviewForm />
        <textarea name='comment' />
        <input name='planId' value={plan.id} hidden readOnly />
        <input name='userId' value={user.id} hidden readOnly />
        <input name='streamerId' value={streamer.id} hidden readOnly />
        <button type='submit'>レビューを送信</button>
      </form>
    </div>
  )
}
