import { redirect } from 'next/navigation'
import AvailableDateTimeTable from './components/AvailableDateTimeTable'
import ProfileForm from './components/ProfileForm'
import { hasDetailsSubmittedToStripe, linkToStripeAccount } from '@/actions/stripe'
import { getOneWeekDateTimes } from '@/app/streamers/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getAvailableDateTimes } from '@/data/availableDateTime'
import { getStreamer } from '@/data/streamer'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const streamer = await getStreamer(user.id)
  const availableDateTimes = await getAvailableDateTimes(user.id)
  const hasSubmittedDetails = await hasDetailsSubmittedToStripe(
    streamer.stripe_account_id,
  )

  const oneWeekDateTimes = getOneWeekDateTimes()

  return (
    <div className='container mx-auto mt-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>マイページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='my-8'>
        <ProfileForm streamer={streamer} />
      </div>
      {hasSubmittedDetails ? (
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
