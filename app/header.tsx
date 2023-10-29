import CommonButton from './_components/button/CommonButton'
import OutlinedButton from './_components/button/OutlinedButton'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { fetchUserWithEmail } from './_hooks/useUser'

export default async function Header() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    },
  )

  const { data, error } = await supabase.auth.getSession()
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
            {session ? (
              <>
                <Link href={`/users/${user?.id}`}>
                  <OutlinedButton>マイページ</OutlinedButton>
                </Link>
                <Link href='/signout'>
                  <OutlinedButton>ログアウト</OutlinedButton>
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
