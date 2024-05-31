import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser, isStreamer } from '@/data/auth'
import {
  getCompletedUserReservations,
  getUserReservations,
} from '@/data/reservation'
import { redirect } from 'next/navigation'
import { ReservationCard } from './components/ReservationCard'

export default async function Page() {
  const user = await currentUser()
  if (!user || isStreamer(user)) redirect('/signin')

  const reservations = await getUserReservations(user.id)
  const completedReservations = await getCompletedUserReservations(user.id)

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
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
      <h2 className='text-xl font-bold'>完了した予約</h2>
      <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
        {completedReservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            completed={true}
          />
        ))}
      </div>
    </div>
  )
}
