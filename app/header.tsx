import { createLoginLink } from '@/actions/stripe'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { currentUser, isStreamer } from '@/data/auth'
import { getStreamer } from '@/data/streamer'
import { ExternalLink, MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Header() {
  const user = await currentUser()
  const streamer =
    user && isStreamer(user) ? await getStreamer(user.id) : undefined

  const stripeLoginLink = await createLoginLink(
    streamer?.stripe_account_id ?? '',
  )

  return (
    <header className='flex h-20 items-center justify-between gap-2 border-b px-10 md:px-[160px]'>
      <Button
        variant='link'
        asChild
        className='text-2xl font-bold hover:no-underline md:pl-0 md:text-3xl'
      >
        <Link href='/'>
          Gamepity<span className='pl-2 text-accent'>β</span>
        </Link>
      </Button>

      <div className='hidden md:block'>
        {user ? (
          <>
            {streamer ? (
              <div className='flex flex-row items-center space-x-2'>
                <Button variant='link' asChild>
                  <Link href='/streamers' className='decoration-accent'>
                    ストリーマーを探す
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/plans' className='decoration-accent'>
                    プラン管理
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <Link
                    href='/available-date-times'
                    className='decoration-accent'
                  >
                    予約可能日時管理
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <Link href='/reservations' className='decoration-accent'>
                    予約管理
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <a
                    href={
                      stripeLoginLink?.url ??
                      'https://gamepity.com/available-date-times'
                    }
                    target='_blank'
                    className='decoration-accent'
                  >
                    売上管理
                    <ExternalLink className='ml-1 size-4' />
                  </a>
                </Button>
                <Button variant='link' asChild>
                  <Link
                    href='/streamers/mypage'
                    className='decoration-accent md:pr-0'
                  >
                    マイページ
                  </Link>
                </Button>
              </div>
            ) : (
              <div className='flex flex-row items-center space-x-2'>
                <Button variant='link' asChild>
                  <Link href='/streamers' className='decoration-accent'>
                    ストリーマーを探す
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <a
                    href='https://brash-ferry-996.notion.site/Gamepity-c71b2d7f03584a19a5fc43aec8cc708b'
                    target='_blank'
                    className='decoration-accent'
                  >
                    遊び方
                  </a>
                </Button>
                <Button variant='link' asChild>
                  <Link
                    href='/users/reservations'
                    className='decoration-accent'
                  >
                    予約管理
                  </Link>
                </Button>
                <Button variant='link' asChild>
                  <Link
                    href='/users/mypage'
                    className='decoration-accent md:pr-0'
                  >
                    マイページ
                  </Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-row space-x-4'>
            <Button variant='link' asChild>
              <Link href='/streamers' className='decoration-accent'>
                ストリーマーを探す
              </Link>
            </Button>
            <Button variant='link' asChild>
              <Link href='/signin' className='decoration-accent'>
                ログイン
              </Link>
            </Button>
            <Button variant='default' asChild className='w-32'>
              <Link href='/users/signup'>新規登録</Link>
            </Button>
          </div>
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
                    <DropdownMenuItem className='flex flex-col'>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/streamers'>ストリーマーを探す</Link>
                      </Button>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/plans'>プラン管理</Link>
                      </Button>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/available-date-times'>
                          予約可能日時管理
                        </Link>
                      </Button>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/reservations'>予約管理</Link>
                      </Button>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <a
                          href={
                            stripeLoginLink?.url ??
                            'https://gamepity.com/available-date-times'
                          }
                          target='_blank'
                        >
                          売上管理
                        </a>
                      </Button>
                      <Button variant='link' asChild className='text-zinc-950'>
                        <Link href='/streamers/mypage'>マイページ</Link>
                      </Button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className='flex flex-col'>
                    <Button variant='link' asChild className='text-zinc-950'>
                      <Link href='/streamers'>ストリーマーを探す</Link>
                    </Button>
                    <Button variant='link' asChild className='text-zinc-950'>
                      <a
                        href='https://brash-ferry-996.notion.site/Gamepity-c71b2d7f03584a19a5fc43aec8cc708b'
                        target='_blank'
                      >
                        遊び方
                      </a>
                    </Button>
                    <Button variant='link' asChild className='text-zinc-950'>
                      <Link href='/users/reservations'>予約管理</Link>
                    </Button>
                    <Button variant='link' asChild className='text-zinc-950'>
                      <Link href='/users/mypage'>マイページ</Link>
                    </Button>
                  </DropdownMenuItem>
                )}
              </>
            ) : (
              <DropdownMenuItem className='flex flex-col'>
                <Button variant='link' asChild className='text-zinc-950'>
                  <Link href='/streamers'>ストリーマーを探す</Link>
                </Button>
                <Button variant='link' asChild className='text-zinc-950'>
                  <Link href='/users/signup'>新規登録</Link>
                </Button>
                <Button variant='link' asChild className='text-zinc-950'>
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
