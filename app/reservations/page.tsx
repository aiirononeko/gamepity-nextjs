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
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReservationCard } from './components/ReservationCard'

export const metadata: Metadata = {
  title: 'ストリーマー予約管理 | Gamepity',
  description: 'ストリーマー予約管理ページ',
}

export default async function Page() {
  const user = await currentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const reservations = await getStreamerReservations(user.id)
  // const oneWeekDateTimes = getOneWeekDateTimesFromToday()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href='/'>トップ</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>予約管理</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>予約管理</h2>
      <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
      {/* <ReservationDateTimeTable */}
      {/*   reservations={reservations} */}
      {/*   oneWeekDateTimes={oneWeekDateTimes} */}
      {/* /> */}
    </div>
  )
}
