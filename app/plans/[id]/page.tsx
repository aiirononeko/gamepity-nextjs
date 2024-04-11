import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import AvailableDateTimeTable from './components/AvailableDateTimeTable'

export default async function Page({ params }: { params: { id: string } }) {
  const plan = await getPlan(Number(params.id))
  const availableDateTimes = await getAvailableDateTimes(plan.streamer_id)

  return (
    <div className='container mx-auto mt-10'>
      <div className='mb-10'>
        <p className='mb-4 text-xl font-bold text-game-white'>選択中のプラン</p>
        <PlanCard plan={plan} />
      </div>
      <div className='mb-10'>
      {availableDateTimes && availableDateTimes.length > 0 ? (
        <AvailableDateTimeTable availableDateTimes={availableDateTimes} />
      ) : (
        <p className='text-center text-xl font-bold text-game-white'>
          予約可能な日時がありません
        </p>
      )}
      </div>
      <div className='mb-10'>
        <p className='mb-4 text-xl font-bold text-game-white text-center'>※予約時の注意事項</p>
      </div>
    </div>
  )
}
