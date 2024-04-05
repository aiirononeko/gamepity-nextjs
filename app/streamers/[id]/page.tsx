import Image from 'next/image'
import GameCard from '@/app/components/GameCard'
import { getGames } from '@/app/data/game'
import { getPlans } from '@/app/data/plan'
import { getStreamer } from '@/app/data/streamer'
import PlanCard from './components/PlanCard'

export default async function Page({ params }: { params: { id: string } }) {
  const streamer = await getStreamer(params.id)
  const games = await getGames() // TODO
  const plans = await getPlans(params.id)
  const rate = undefined // TODO

  return (
    <div className='container mx-auto mt-10'>
      {streamer.icon_url ? (
        <div className='mb-6 w-full' style={{ backgroundImage: streamer.icon_url }}>
          <Image
            alt={`${streamer.name}のアイコン`}
            src={streamer.icon_url}
            className='h-64 w-1/2'
          />
        </div>
      ) : (
        <div className='mx-auto mb-6 h-64 w-1/2 bg-game-gray-500 text-game-gray-300'></div>
      )}
      <div className='mb-10'>
        <p className='mb-4 text-xl font-bold text-game-white'>{streamer.name}</p>
        <p className='mb-4 line-clamp-3 text-xs text-game-gray-300'>{streamer.profile}</p>
        <div className='flex flex-row space-x-6'>
          <p>youtubeのアイコン</p>
          <p>twichのアイコン</p>
          <p>xのアイコン</p>
        </div>
      </div>
      {games && (
        <div className='mb-10'>
          <div className='flex flex-row space-x-6 overflow-y-auto'>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
      {plans && (
        <div className='mb-10'>
          <h2 className='mb-4 text-xl font-bold text-game-white'>プラン</h2>
          <div className='space-y-6'>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
