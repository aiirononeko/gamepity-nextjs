import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import AvailableDateTimeTable from '@/app/streamers/[id]/reservation/components/AvailableDateTimeTable'
import { getOneWeekDateTimes } from '@/app/streamers/utils'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const plan = await getPlan(Number(searchParams.planId))
  const availableDateTimes = await getAvailableDateTimes(plan.streamer_id)
  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='container mx-auto mt-10'>
      <div className='mb-10'>
        <p className='mb-4 text-xl font-bold text-game-white'>選択中のプラン</p>
        <PlanCard plan={plan} />
      </div>
      <div className='mb-10'>
        {availableDateTimes && (
          <AvailableDateTimeTable
            availableDateTimes={availableDateTimes}
            plan={plan}
            oneWeekDateTimes={oneWeekDateTimes}
          />
        )}
      </div>
    </div>
  )
}
