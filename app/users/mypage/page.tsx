import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser, isStreamer } from '@/data/auth'
import { getUserReservations } from '@/data/reservation'
import { getUser } from '@/data/user'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileForm from './components/ProfileForm'
import SignOutForm from './components/SignOutForm'
import WithdrawalForm from './components/WithdrawalForm'

export const metadata: Metadata = {
  title: 'ユーザーマイページ | Gamepity',
  description: 'ユーザーマイページ',
}

export default async function Page() {
  const user = await currentUser()
  if (!user || isStreamer(user)) redirect('/signin')

  const userFromTable = await getUser(user.id)
  const reservations = await getUserReservations(user.id)

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>トップ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>マイページ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>プロフィール編集</h2>
      <ProfileForm user={userFromTable} />
      <h2 className='text-xl font-bold'>ログアウト</h2>
      <SignOutForm />
      <h2 className='text-xl font-bold'>退会</h2>
      {reservations.length === 0 ? (
        <WithdrawalForm userId={user.id} />
      ) : (
        <p>未完了の予約があるため退会できません</p>
      )}
    </div>
  )
}
