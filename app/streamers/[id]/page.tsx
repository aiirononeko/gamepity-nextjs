import Image from 'next/image'
import Review from './components/Review'
import SnsCard from './components/SnsCard'
import GameCard from '@/app/streamers/[id]/components/GameCard'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import { getStreamer } from '@/data/streamer'

export default async function Page({ params }: { params: { id: string } }) {
  const streamer = await getStreamer(params.id)

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
      <div className='space-y-6'>
        <p className='text-3xl font-bold text-game-white'>{streamer.name}</p>
        <p className='text-game-white'>{streamer.profile}</p>
        <div className='flex flex-row items-center justify-end space-x-6'>
          {streamer.youtube_url && (
            <SnsCard sns_url={streamer.youtube_url} image_src={'/sns/youtube_logo.png'} />
          )}
          {streamer.twitch_url && (
            <SnsCard sns_url={streamer.twitch_url} image_src={'/sns/twitch_logo.png'} />
          )}
          {streamer.x_url && (
            <SnsCard sns_url={streamer.x_url} image_src={'/sns/x_logo.png'} />
          )}
        </div>
      </div>
      {streamer.games && streamer.games.length > 0 && (
        <div className='mb-10'>
          <div className='flex flex-row space-x-6 overflow-y-auto'>
            {streamer.games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
      {streamer.plans && streamer.plans.length > 0 && (
        <div className='mb-10'>
          <h2 className='mb-4 text-2xl font-bold text-game-white'>プラン</h2>
          <div className='space-y-6'>
            {streamer.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}
      <div className='mb-10'>
        <h2 className='mb-4 text-2xl font-bold text-game-white'>ユーザーの評価</h2>
        {streamer.reviews && streamer.reviews.length > 0 ? (
          <Review reviews={streamer.reviews} streamer={streamer} />
        ) : (
          <p className='text-game-white'>まだ評価されていないストリーマーです</p>
        )}
      </div>
    </div>
  )
}
