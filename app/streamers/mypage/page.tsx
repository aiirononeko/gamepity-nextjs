import { createLinkToStripeAccountUrl } from '@/actions/stripe'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser, isStreamer } from '@/data/auth'
import { getStreamerReservations } from '@/data/reservation'
import { getStreamer } from '@/data/streamer'
import { AlertCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileForm from './components/ProfileForm'
import { Share } from './components/Share'
import SignOutForm from './components/SignOutForm'
import StreamerRegistrationStepper from './components/StreamerRegistrationStepper'
import WithdrawalForm from './components/WithdrawalForm'
import { currentStep } from './utils'

export const metadata: Metadata = {
  title: 'ストリーマーマイページ | Gamepity',
  description: 'ストリーマーマイページ',
}

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

  const reservations = await getStreamerReservations(user.id)

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-10 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href='/'>トップ</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>マイページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex flex-col space-y-5 pb-10'>
        <Alert className='w-80 md:w-full'>
          <AlertCircle className='size-4' color='#FFFFFF' />
          <AlertTitle>お知らせ</AlertTitle>
          <AlertDescription>
            Gamepityは2024/7/31までβ版運用を実施しています。
          </AlertDescription>
        </Alert>
        <div className='flex w-80 flex-row items-center justify-between'>
          <h2 className='text-xl font-bold'>プロフィール登録</h2>
          <Share streamerId={streamer.id} />
        </div>
        <div className='grid w-80 grid-cols-1 gap-20 md:mb-0 md:w-full md:grid-cols-2'>
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
        {reservations.length === 0 ? (
          <WithdrawalForm />
        ) : (
          <p>未完了の予約があるため退会できません</p>
        )}
      </div>
    </div>
  )
}
