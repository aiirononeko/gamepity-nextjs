import Link from 'next/link'
import { redirect } from 'next/navigation'
import Reservation from './components/Reservation'
import { signOut } from '@/actions/auth'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getCompletedUserReservations, getUserReservations } from '@/data/reservation'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')
  // if (isStreamer(user)) redirect('/streamers/mypage')

  const reservations = await getUserReservations(user.id)
  const completedReservations = await getCompletedUserReservations(user.id)

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
      <div className=''>
        <h2 className='text-game-white text-xl font-bold'>ユーザーID</h2>
        <p className='text-game-white mt-6'>{user.id}</p>
      </div>
      <div>
        <a
          href='https://forms.gle/7q46iG3RpRTGw6Qa6'
          className='text-game-gray-500 underline'
        >
          運営に問い合わせ
        </a>
      </div>
      <form action={signOut} className=''>
        <button type='submit' className='text-game-gray-500 underline'>
          ログアウト
        </button>
      </form>
      {/* <form action={withdrawal} className=''> */}
      {/*   <button type='submit' className='text-game-gray-500 underline'>退会</button> */}
      {/* </form> */}
    </div>
  )
}
