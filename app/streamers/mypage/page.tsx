import IconUploadForm from './components/IconUploadForm'
import ProfileForm from './components/ProfileForm'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import Game from '@/components/Game'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getStreamer } from '@/data/streamer'
import Link from 'next/link'

// import { getUser } from '@/data/auth'

// TODO: gamesとplansがStreamerの型として認識されていない問題を修正する
export default async function Page() {
  // const streamer = await getUser()
  // if (!streamer || streamer.user_metadata.is_streamer) {
  //   // TODO: アクセス不可
  // }

  const streamer = await getStreamer('185f2f83-d63a-4c9b-b4a0-7e4a885799e3')
  const availableDateTimes = await getAvailableDateTimes(
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e3',
  )
  // @ts-ignore
  const { games, plans } = streamer

  return (
    <div className='container mx-auto mt-12'>
      <div className='flex flex-row px-32 pb-12'>
        <IconUploadForm userId={streamer.id} initialIconUrl={streamer.icon_url} />
        <ProfileForm
          streamerId={streamer.id}
          initialName={streamer.name}
          initialProfile={streamer.profile}
          initialYoutubeUrl={streamer.youtube_url}
          initialTwitchUrl={streamer.twitch_url}
          initialXUrl={streamer.x_url}
        />
      </div>
      {games && games.length > 0 && (
        <div className='mb-10'>
          <div className='flex flex-row space-x-4 overflow-y-auto'>
            {/* @ts-ignore */}
            {games.map((game) => (
              <Game key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
      {plans && plans.length > 0 && (
        <div className='mb-10'>
          <div className='mb-2 mt-10 grid grid-cols-12'>
            <h2 className='h-full leading-loose col-span-10 text-2xl font-bold text-game-white'>プラン</h2>
            <div className='col-span-2 mx-auto'>
              <Link href='/plans/new'>
                <button className='text-end rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-2 text-game-white'>
                  新しいプランを作成
                </button>
              </Link>
            </div>
          </div>
          <div className='space-y-4'>
            {/* @ts-ignore */}
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
