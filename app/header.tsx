import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { currentUser, isStreamer } from '@/data/auth'
import { getStreamer } from '@/data/streamer'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Header() {
  const user = await currentUser()
  const streamer = user && isStreamer(user) && (await getStreamer(user.id))

  return (
    <header className='flex h-20 items-center justify-between gap-2 border-b px-10 md:px-[160px]'>
      <Button
        variant='link'
        asChild
        className='text-2xl font-bold hover:no-underline md:text-3xl'
      >
        <Link href='/'>Gamepity β</Link>
      </Button>
      <div className='hidden md:block'>
        {user ? (
          <>
            {streamer ? (
              <>
                <Button variant='link' asChild>
                  <Link href='/plans'>プラン管理</Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/available-date-times'>予約可能日時管理</Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/reservations'>予約管理</Link>
                </Button>
                <Button variant='link' asChild>
                  <a href=''>売上管理</a>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/streamers/mypage'>マイページ</Link>
                </Button>
              </>
            ) : (
              <Button variant='link' asChild>
                <Link href='/users/mypage'>マイページ</Link>
              </Button>
            )}
          </>
        ) : (
          <Button variant='outline' asChild>
            <Link href='/signin'>ログイン</Link>
          </Button>
        )}
      </div>
      <div className='block md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon className='mt-2 size-6' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <>
                {streamer ? (
                  <>
                    <DropdownMenuItem>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/plans'>プラン管理</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/available-date-times'>
                          予約可能日時管理
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/reservations'>予約管理</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <a href=''>売上管理</a>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/streamers/mypage'>マイページ</Link>
                      </Button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Button variant='link' asChild className='text-zinc-950'>
                      <Link href='/users/mypage'>マイページ</Link>
                    </Button>
                  </DropdownMenuItem>
                )}
              </>
            ) : (
              <DropdownMenuItem>
                <Button variant='outline' asChild className='text-zinc-950'>
                  <Link href='/signin'>ログイン</Link>
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
