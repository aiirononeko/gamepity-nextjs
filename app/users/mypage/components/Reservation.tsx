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
        <div className='h-52 w-full bg-game-gray-500'></div>
      )}
      <div className='h-56 w-full rounded-b-xl bg-game-gray-700 p-5'>
        <p className='mb-2 text-xs text-game-white'>ストリーマー</p>
        <p className='mb-4 font-bold text-game-white'>{streamer.name}</p>
        <p className='mb-2 text-xs text-game-white'>プラン</p>
        <p className='mb-4 font-bold text-game-white'>{plan.name}</p>
        <p className='mb-2 text-xs text-game-white'>開始日時</p>
        <p className='font-bold text-game-white'>{formattedStartDateTime}</p>
      </div>
    </div>
  )
}
