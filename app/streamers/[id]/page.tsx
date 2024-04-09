import Image from 'next/image'
import { getGames } from '@/data/game'
import { getPlans } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import GameCard from '@/app/streamers/[id]/components/GameCard'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import { getReviews } from '@/data/review'

export default async function Page({ params }: { params: { id: string } }) {
  const streamer = await getStreamer(params.id)
  const games = await getGames() // TODO
  const plans = await getPlans(params.id)
  const reviews = await getReviews(params.id)

  return (
    <div className='container mx-auto mt-10'>
      {streamer.icon_url ? (
        <Image
          alt={`${streamer.name}のアイコン`}
          src={streamer.icon_url}
          className='h-64 w-1/2'
        />
      ) : (
        <div className='mx-auto mb-6 h-64 w-1/2 bg-game-gray-600'></div>
      )}
      <div className='mb-10'>
        <p className='mb-4 text-3xl font-bold text-game-white'>{streamer.name}</p>
        <p className='mb-4 line-clamp-3 text-xs text-game-white'>{streamer.profile}</p>
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
          <h2 className='mb-4 text-2xl font-bold text-game-white'>プラン</h2>
          <div className='space-y-6'>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}
      {reviews ? (
        <div className='mb-10'>
          <h2 className='mb-4 text-2xl font-bold text-game-white'>ユーザーの評価</h2>
          <div className='space-y-6'>
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      ) : (
        <div className='mb-10'>
          <h2 className='mb-4 text-2xl font-bold text-game-white'>ユーザーの評価</h2>
          <p className='text-game-white'>まだ評価されていないストリーマーです</p>
        </div>
      )}
    </div>
  )
}
