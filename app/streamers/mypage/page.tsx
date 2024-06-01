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
import WithdrawalForm from './components/WithdrawalForm'

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
      <h2 className='text-xl font-bold'>ログアウト</h2>
      <SignOutForm />
      <h2 className='text-xl font-bold'>退会</h2>
      <WithdrawalForm userId={user.id} />
    </div>
  )
}
