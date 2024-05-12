import Link from 'next/link'
import { redirect } from 'next/navigation'
import AvailableDateTimeTable from './components/AvailableDateTimeTable'
import IconUploadForm from './components/IconUploadForm'
import ProfileForm from './components/ProfileForm'
import { hasDetailsSubmittedToStripe, linkToStripeAccount } from '@/actions/stripe'
import PlanCard from '@/app/streamers/[id]/components/PlanCard'
import { getOneWeekDateTimes } from '@/app/streamers/utils'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getStreamer } from '@/data/streamer'

// TODO: gamesとplansがStreamerの型として認識されていない問題を修正する
export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const streamer = await getStreamer(user.id)
  // @ts-ignore
  const { plans } = streamer
  const availableDateTimes = await getAvailableDateTimes(user.id)
  const hasSubmittedDetails = await hasDetailsSubmittedToStripe(
    streamer.stripe_account_id,
  )

  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='container mx-auto mt-12'>
      <div className='mb-6'>
        <Link href='/' className='text-game-gray-300'>
          ← トップに戻る
        </Link>
      </div>
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
      {hasSubmittedDetails ? (
        <>
          {plans && plans.length > 0 ? (
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
                  <PlanCard key={plan.id} plan={plan} streamer={streamer} />
                ))}
              </div>
            </div>
          ) : (
            <div className='mb-10 mt-6 flex flex-col items-center justify-center space-y-10'>
              <p className='text-xl font-bold text-game-white'>プランがありません</p>
              <Link href='/plans/new'>
                <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-6 py-2 text-end text-game-white'>
                  新しいプランを作成
                </button>
              </Link>
            </div>
          )}
          <div className='mb-10'>
            <h2 className='mb-4 h-full text-2xl font-bold leading-loose text-game-white'>
              予約可能日時登録
            </h2>
            <AvailableDateTimeTable
              availableDateTimes={availableDateTimes}
              oneWeekDateTimes={oneWeekDateTimes}
              streamerId={streamer.id}
            />
          </div>
        </>
      ) : (
        <div className='mb-10 flex flex-col items-center space-y-6'>
          <p className='text-center text-xl font-bold text-game-white'>
            Stripeでビジネス情報を登録してください
          </p>
          <form action={linkToStripeAccount}>
            <input
              type='hidden'
              name='stripeAccountId'
              value={streamer.stripe_account_id ?? ''}
              readOnly
            />
            <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-10 py-2 text-end text-game-white'>
              登録する
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
