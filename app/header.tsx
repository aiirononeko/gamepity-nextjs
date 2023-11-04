import { cookies } from 'next/headers'
import Link from 'next/link'

import CommonButton from './_components/button/CommonButton'
import OutlinedButton from './_components/button/OutlinedButton'
import { fetchUserWithEmail } from './_services/userService'

import { createSupabaseClient } from '@/app/_lib/supabase'

export default async function Header() {
  const cookieStore = cookies()
  const supabase = createSupabaseClient(cookieStore)

  const { data } = await supabase.auth.getSession()
  const { session } = data

  const user = session && (await fetchUserWithEmail(session.user.email!))

  return (
    <header className='shadow-md'>
      <nav className='px-16 py-6 mb-6'>
        <div className='flex flex-wrap justify-between items-center mx-auto'>
          <a href='/' className='flex items-center'>
            <h1 className='text-game-yellow text-5xl font-bold pb-2'>Gamepity</h1>
          </a>
          <div className='flex items-center space-x-2 lg:order-2'>
            {session && user ? (
              <>
                <Link href={`/users/${user.id}`}>
                  <OutlinedButton>マイページ</OutlinedButton>
                </Link>
              </>
            ) : (
              <>
                <Link href='/signin'>
                  <OutlinedButton>ログイン</OutlinedButton>
                </Link>
                <Link href='/users/signup'>
                  <CommonButton>新規登録</CommonButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
