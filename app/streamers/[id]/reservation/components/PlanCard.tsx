import Image from 'next/image'
import type { Game } from '@/types/game'
import type { Plan } from '@/types/plan'
import type { Streamer } from '@/types/streamer'

type Props = {
  plan: Plan
  streamer: Streamer
  games: Game[]
}

export default function PlanCard({ plan, streamer, games }: Props) {
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
      <div className='basis-7/12'>
        <p className='text-game-white my-10 mr-8 line-clamp-4'>{plan.description}</p>
      </div>
    </div>
  )
}
