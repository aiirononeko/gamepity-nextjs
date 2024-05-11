import Image from 'next/image'
import Link from 'next/link'
import { getGamesWithPlanId } from '@/data/game'
import type { Plan } from '@/types/plan'
import type { Streamer } from '@/types/streamer'

type Props = {
  plan: Plan
  streamer: Streamer
}

export default async function PlanCard({ plan, streamer }: Props) {
  const games = await getGamesWithPlanId(plan.id)

  return (
    <div className='bg-game-gray-600 flex h-44 flex-row transition duration-300'>
      <div className='basis-2/12'>
        {streamer.icon_url ? (
          <div className='bg-game-gray-300 relative mx-16 my-11 h-2/3 w-2/5 rounded-full'>
            <Image
              alt={`${streamer.name}のアイコン`}
              src={streamer.icon_url}
              fill={true}
            />
          </div>
        ) : (
          <div className='bg-game-gray-300 mx-16 my-11 h-1/2 w-2/5 rounded-full'></div>
        )}
      </div>
      <div className='basis-3/12'>
        <div>
          <p className='text-game-white mb-4 mt-8 text-2xl font-bold'>{plan.name}</p>
          <p className='text-game-white mb-4 text-xl font-bold'>{plan.amount}円 / 60分</p>
          <div className='flex flex-row space-x-4'>
            {games.map((game) => (
              <div key={game.id} className=''>
                <p className='text-game-white'>{game.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='basis-5/12'>
        <p className='text-game-white my-10 mr-8 line-clamp-4'>{plan.description}</p>
      </div>
      <div className='basis-2/12'>
        <Link href={`/streamers/${plan.streamer_id}/reservation/?planId=${plan.id}`}>
          <button className='border-game-white text-game-white my-16 rounded border-2 border-solid bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-3 hover:-translate-y-1'>
            このプランで予約
          </button>
        </Link>
      </div>
    </div>
  )
}
