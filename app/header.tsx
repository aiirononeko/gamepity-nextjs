import Link from 'next/link'
import { createLoginLink } from '@/actions/stripe'
import Button from '@/app/components/Button'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getStreamer } from '@/data/streamer'

export default async function Header() {
  const user = await getCurrentUser()

  const streamer = user && isStreamer(user) ? await getStreamer(user.id) : undefined
  const stripeLoginLink = streamer
    ? await createLoginLink(streamer.stripe_account_id ?? '')
    : undefined

  return (
    <header className='bg-gradient-to-r from-game-gray-900 via-game-gray-700 to-game-gray-900'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-6'>
        <Link
          href='/'
          className='self-center whitespace-nowrap text-4xl font-bold text-game-white'
        >
          Gamepity
        </Link>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='size-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse'>
            <li>
              <a
                href='https://brash-ferry-996.notion.site/Gamepity-c71b2d7f03584a19a5fc43aec8cc708b'
                className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
              >
                遊び方
              </a>
            </li>
            <li>
              <Link
                href='/streamers'
                className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
              >
                ストリーマー
              </Link>
            </li>
            {streamer && stripeLoginLink && (
              <>
                <li>
                  <a
                    href={stripeLoginLink.url}
                    target='_blank'
                    className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                  >
                    売上管理
                  </a>
                </li>
                <li>
                  <Link
                    href={`/streamers/${streamer.id}/reservations`}
                    className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                  >
                    予約管理
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/plans`}
                    className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                  >
                    プラン管理
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/available-date-times`}
                    className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                  >
                    予約可能日時管理
                  </Link>
                </li>
              </>
            )}
            {user ? (
              <li>
                <Link
                  href={'/users/mypage'}
                  className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                >
                  マイページ
                </Link>
              </li>
            ) : (
              <Link href='/signin'>
                <Button>ログイン</Button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
