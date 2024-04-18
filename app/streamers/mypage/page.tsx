import Link from 'next/link'
import IconUploadForm from './components/IconUploadForm'
import ProfileForm from './components/ProfileForm'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import Game from '@/components/Game'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { redirect } from 'next/navigation'
import { getStreamer } from '@/data/streamer'

// TODO: gamesとplansがStreamerの型として認識されていない問題を修正する
export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) {
    redirect('/')
  }

  const streamer = await getStreamer(user.id)
  const availableDateTimes = await getAvailableDateTimes(user.id)
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
            <h2 className='col-span-10 h-full text-2xl font-bold leading-loose text-game-white'>
              プラン
            </h2>
            <div className='col-span-2 mx-auto'>
              <Link href='/plans/new'>
                <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-2 text-end text-game-white'>
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
