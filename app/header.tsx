import CommonButton from './_components/button/CommonButton'
import OutlinedButton from './_components/button/OutlinedButton'

export default function Header() {
  return (
    <header className='shadow-md'>
      <nav className='px-16 py-6 mb-6'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <a href='/' className='flex items-center'>
            <h1 className='text-game-yellow text-5xl font-bold pb-2'>Gamepity</h1>
          </a>
          <div className='flex items-center space-x-2 lg:order-2'>
            <a href='/signin'>
              <OutlinedButton>ログイン</OutlinedButton>
            </a>
            <a href='/signup'>
              <CommonButton>新規登録</CommonButton>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
