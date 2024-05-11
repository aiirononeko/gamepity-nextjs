import Image from 'next/image'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import type { Reservation } from '@/types/reservation'
import { date, format } from '@formkit/tempo'

type Props = {
  reservation: Reservation
}

export default async function Reservation({ reservation }: Props) {
  const streamer = await getStreamer(reservation.streamer_id)
  const plan = await getPlan(reservation.plan_id)

  const formattedStartDateTime = format(
    date(reservation.start_date_dime),
    'YYYY/MM/DD hh:00',
  )

  return (
    <div>
      {streamer.icon_url ? (
        <div className={`relative h-52 w-full`}>
          <Image alt={`${streamer.name}のアイコン`} src={streamer.icon_url} fill={true} />
        </div>
      ) : (
        <div className='bg-game-gray-500 h-52 w-full'></div>
      )}
      <div className='bg-game-gray-700 h-56 w-full rounded-b-xl p-5'>
        <p className='text-game-white mb-2 text-xs'>ストリーマー</p>
        <p className='text-game-white mb-4 font-bold'>{streamer.name}</p>
        <p className='text-game-white mb-2 text-xs'>プラン</p>
        <p className='text-game-white mb-4 font-bold'>{plan.name}</p>
        <p className='text-game-white mb-2 text-xs'>開始日時</p>
        <p className='text-game-white font-bold'>{formattedStartDateTime}</p>
      </div>
    </div>
  )
}
