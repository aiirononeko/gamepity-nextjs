import Link from 'next/link'
import Button from '@/app/components/Button'
import { getCurrentUser } from '@/data/auth'

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <header className='bg-gradient-to-r from-game-gray-900 via-game-gray-700 to-game-gray-900'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-6'>
        <Link
          href='/'
          className='self-center whitespace-nowrap text-4xl font-bold text-game-white'
        >
          Gamepity
        </Link>
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse'>
            <li>
              <Link
                href='/'
                className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
                aria-current='page'
              >
                TOP
              </Link>
            </li>
            <li>
              <Link
                href='/streamers'
                className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
              >
                ストリーマー
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className='block rounded px-3 py-2 font-bold leading-10 text-game-white hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-500'
              >
                遊び方
              </Link>
            </li>
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
