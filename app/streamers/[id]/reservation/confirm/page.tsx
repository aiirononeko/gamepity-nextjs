import { getAvailableDateTime } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const plan = await getPlan(Number(searchParams.planId))
  const availableDateTime = await getAvailableDateTime(
    Number(searchParams.availableDateTimeId),
  )
  const streamer = await getStreamer(plan.streamer_id)

  return (
    <div className='container mx-auto mt-10'>
      <h2 className='mb-4 text-2xl font-bold text-game-white'>予約内容の確認</h2>
      <div>
        <p>{streamer.name}</p>
        <p>{plan.name}</p>
        <p>{availableDateTime.start_date_time}</p>
        <div className='mb-10'>
          <p className='mb-4 text-center text-xl font-bold text-game-white'>
            ※予約時の注意事項
          </p>
        </div>
        <a href={plan.stripe_payment_link_id}>
          <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'>
            この内容で予約する
          </button>
        </a>
      </div>
    </div>
  )
}
