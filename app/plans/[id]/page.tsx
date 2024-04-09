import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'

export default async function Page({ params }: { params: { id: string } }) {
  const plan = await getPlan(Number(params.id))
  const availableDateTime = await getAvailableDateTimes(plan.streamer_id)

  return (
    <div className='container mx-auto mt-10'>
      <p className='mb-4 text-xl font-bold text-game-white'>選択中のプラン</p>
      <PlanCard plan={plan} />
    </div>
  )
}
