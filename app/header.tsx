import { Button } from '@/components/ui/button'
import { currentUser, isStreamer } from '@/data/auth'
import { getStreamer } from '@/data/streamer'
import Link from 'next/link'

export default async function Header() {
  const user = await currentUser()
  const streamer = user && isStreamer(user) && (await getStreamer(user.id))

  return (
    <header className='flex h-20 items-center justify-center gap-2 border-b md:justify-between md:px-[160px]'>
      <Link href='/' className='text-2xl font-bold'>
        Gamepity β
      </Link>

      <div className='hidden'>
        {user ? (
          <>
            {streamer && (
              <div>
                <Button variant='outline' asChild>
                  <Link href='/plans'>プラン管理</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/available-date-times'>予約可能日時管理</Link>
                </Button>
                <Button variant='outline' asChild>
                  <Link href='/reservations'>予約管理</Link>
                </Button>
                <Button variant='outline' asChild>
                  <a href=''>売上管理</a>
                </Button>
              </div>
            )}
            <Button variant='outline' asChild>
              <Link href='/users/mypage'>マイページ</Link>
            </Button>
          </>
        ) : (
          <Button variant='outline' asChild>
            <Link href='/signin'>ログイン</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
