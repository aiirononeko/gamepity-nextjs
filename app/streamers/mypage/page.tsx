import { createLinkToStripeAccountUrl } from '@/actions/stripe'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser, isStreamer } from '@/data/auth'
import { getStreamer } from '@/data/streamer'
import { redirect } from 'next/navigation'
import ProfileForm from './components/ProfileForm'
import SignOutForm from './components/SignOutForm'
import StreamerRegistrationStepper from './components/StreamerRegistrationStepper'
import WithdrawalForm from './components/WithdrawalForm'
import { currentStep } from './utils'

export default async function Page() {
  const user = await currentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const streamer = await getStreamer(user.id)
  // @ts-expect-error Supabaseの型解決がうまくいかないため
  const { plans, available_date_times } = streamer

  const stripeAccountLinkUrl = await createLinkToStripeAccountUrl(
    streamer.stripe_account_id ?? '',
  )
  const step = await currentStep(
    streamer,
    plans.length,
    available_date_times.length,
  )

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-8 md:mx-[160px] md:mt-10 md:items-start'>
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
      <div className='flex flex-col space-y-4'>
        <h2 className='text-xl font-bold'>プロフィール登録</h2>
        <div className='grid w-80 grid-cols-1 gap-16 md:w-full md:grid-cols-2 md:gap-28'>
          <ProfileForm streamer={streamer} />
          <StreamerRegistrationStepper
            currentStep={step}
            stripeAccountLinkUrl={stripeAccountLinkUrl}
          />
        </div>
      </div>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-xl font-bold'>ログアウト</h2>
        <SignOutForm />
      </div>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-xl font-bold'>退会</h2>
        <WithdrawalForm userId={user.id} />
      </div>
    </div>
  )
}
