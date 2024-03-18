'use client'

import Link from 'next/link'

import CommonButton from '@/app/_components/button/CommonButton'

export default async function Header() {
  const user = undefined // TODO

  const loginModalOpen = () => {
    console.log('open login modal!') // TODO
  }

  return (
    <nav className='bg-gradient-to-r from-game-gray-900 via-game-gray-700 to-game-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='/'
          className='self-center text-4xl font-bold whitespace-nowrap text-game-white'
        >
          Gamepity
        </Link>
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0'>
            <li>
              <Link
                href='#'
                className='font-bold block py-2 px-3 rounded md:border-0 md:p-0 text-game-white md:hover:text-blue-500 hover:bg-gray-700 hover:game-white md:hover:bg-transparent leading-10'
                aria-current='page'
              >
                TOP
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='font-bold block py-2 px-3 rounded md:border-0 md:p-0 text-game-white md:hover:text-blue-500 hover:bg-gray-700 hover:game-white md:hover:bg-transparent leading-10'
              >
                ストリーマー
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='font-bold block py-2 px-3 rounded md:border-0 md:p-0 text-game-white md:hover:text-blue-500 hover:bg-gray-700 hover:game-white md:hover:bg-transparent leading-10'
              >
                遊び方
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  href='#'
                  className='font-bold block py-2 px-3 rounded md:border-0 md:p-0 text-game-white md:hover:text-blue-500 hover:bg-gray-700 hover:game-white md:hover:bg-transparent leading-10'
                >
                  マイページ
                </Link>
              </li>
            ) : (
              <CommonButton onClick={loginModalOpen}>ログイン</CommonButton>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
