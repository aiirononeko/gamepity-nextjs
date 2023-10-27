import CommonButton from './_components/button/CommonButton'
import OutlinedButton from './_components/button/OutlinedButton'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='shadow-md'>
      <nav className='px-16 py-6 mb-6'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <a href='/' className='flex items-center'>
            <h1 className='text-game-yellow text-5xl font-bold pb-2'>Gamepity</h1>
          </a>
          <div className='flex items-center space-x-2 lg:order-2'>
            <Link href='/signin'>
              <OutlinedButton>ログイン</OutlinedButton>
            </Link>
            <Link href='/users/signup'>
              <CommonButton>新規登録</CommonButton>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
