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

export default async function Page() {
  const user = await currentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const streamer = await getStreamer(user.id)

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
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
      <h2 className='text-xl font-bold'>プロフィール編集</h2>
      <ProfileForm streamer={streamer} />
      {/* {hasSubmittedDetails ? ( */}
      {/*   <div className='mb-10'> */}
      {/*     <h2 className='mb-4 h-full text-2xl font-bold leading-loose text-game-white'> */}
      {/*       予約可能日時登録 */}
      {/*     </h2> */}
      {/*     <AvailableDateTimeTable */}
      {/*       availableDateTimes={availableDateTimes} */}
      {/*       oneWeekDateTimes={oneWeekDateTimes} */}
      {/*       streamerId={streamer.id} */}
      {/*     /> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   <div className='mb-10 flex flex-col items-center space-y-6'> */}
      {/*     <p className='text-center text-xl font-bold text-game-white'> */}
      {/*       Stripeでビジネス情報を登録してください */}
      {/*     </p> */}
      {/*     <form action={linkToStripeAccount}> */}
      {/*       <input */}
      {/*         type='hidden' */}
      {/*         name='stripeAccountId' */}
      {/*         value={streamer.stripe_account_id ?? ''} */}
      {/*         readOnly */}
      {/*       /> */}
      {/*       <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-10 py-2 text-end text-game-white'> */}
      {/*         登録する */}
      {/*       </button> */}
      {/*     </form> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  )
}
