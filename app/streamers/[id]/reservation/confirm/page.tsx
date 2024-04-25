import { redirect } from 'next/navigation'
import { createReservation } from '@/actions/reservation'
import { getCurrentUser } from '@/data/auth'
import { getAvailableDateTime } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const plan = await getPlan(Number(searchParams.planId))
  const availableDateTime = await getAvailableDateTime(
    Number(searchParams.availableDateTimeId),
  )
  const streamer = await getStreamer(plan.streamer_id)

  return (
    <div className='container mx-auto mt-10'>
      <form action={createReservation}>
        <h2 className='mb-4 text-2xl font-bold text-game-white'>予約内容の確認</h2>
        <p>{streamer.name}</p>
        <p>{plan.name}</p>
        <p>{availableDateTime.start_date_time}</p>
        <div className='mb-10'>
          <p className='mb-4 text-center text-xl font-bold text-game-white'>
            ※予約時の注意事項
          </p>
        </div>
        <input
          name='startDateTime'
          value={availableDateTime.start_date_time}
          hidden
          readOnly
        />
        <input name='streamerId' value={streamer.id} hidden readOnly />
        <input name='userId' value={user.id} hidden readOnly />
        <input name='planId' value={plan.id} hidden readOnly />
        <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'>
          この内容で予約する
        </button>
      </form>
    </div>
  )
}
