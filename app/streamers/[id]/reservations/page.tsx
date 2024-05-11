import Link from 'next/link'
import { redirect } from 'next/navigation'
import Reservation from './components/Reservation'
import { getCurrentUser, isStreamer } from '@/data/auth'
import {
  getCompletedStreamerReservations,
  getStreamerReservations,
} from '@/data/reservation'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')
  if (!isStreamer(user)) redirect('/signin')

  const reservations = await getStreamerReservations(user.id)
  const completedReservations = await getCompletedStreamerReservations(user.id)

  return (
    <div className='container mx-auto mt-10 grid space-y-8'>
      <div className=''>
        <Link href='/' className='text-game-gray-300'>
          ← トップに戻る
        </Link>
      </div>
      <div className=''>
        <h2 className='text-game-white text-xl font-bold'>お支払い済みの予約</h2>
        <div className='mt-6 grid grid-cols-4 gap-6'>
          {reservations.length > 0 ? (
            <>
              {reservations.map((reservation) => (
                <Reservation key={reservation.id} reservation={reservation} />
              ))}
            </>
          ) : (
            <p className='text-game-gray-300'>予約がありません</p>
          )}
        </div>
      </div>
      <div className=''>
        <h2 className='text-game-white text-xl font-bold'>完了した予約</h2>
        <div className='mt-6 grid grid-cols-4 gap-6'>
          {completedReservations.length > 0 ? (
            <>
              {completedReservations.map((reservation) => (
                <Reservation key={reservation.id} reservation={reservation} />
              ))}
            </>
          ) : (
            <p className='text-game-gray-300'>完了した予約がありません</p>
          )}
        </div>
      </div>
    </div>
  )
}
