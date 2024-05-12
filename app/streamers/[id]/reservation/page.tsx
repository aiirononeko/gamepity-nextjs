import AvailableDateTimeTable from '@/app/streamers/[id]/reservation/components/AvailableDateTimeTable'
import PlanCard from '@/app/streamers/[id]/reservation/components/PlanCard'
import { getOneWeekDateTimes } from '@/app/streamers/utils'
import { BreadCrumb } from '@/components/BreadCrumb'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getGames } from '@/data/game'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const plan = await getPlan(Number(searchParams.planId))
  const streamer = await getStreamer(plan.streamer_id)
  const tempGames = await getGames()
  const availableDateTimes = await getAvailableDateTimes(plan.streamer_id)
  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='container mx-auto'>
      <BreadCrumb>← プラン選択に戻る</BreadCrumb>
      <div className='mb-10'>
        <p className='mb-4 text-xl font-bold text-game-white'>選択中のプラン</p>
        <PlanCard plan={plan} streamer={streamer} games={[tempGames[0], tempGames[1]]} />
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
