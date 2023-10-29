import OutlinedButton from '@/app/_components/button/OutlinedButton'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { editUser, fetchUserWithEmail } from '@/app/_hooks/useUser'
import { redirect } from 'next/navigation'

const editUserAction = async (formData: FormData) => {
  'use server'

  const name = formData.get('name')
  const profile = formData.get('profile')

  if (name && profile) {
    await editUser(15, name.toString(), profile.toString())

    // マイページに遷移.
    redirect(`/users/15`)
  }
}

export default async function UserEditPage() {
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
    <form
      className='mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2'
      action={editUserAction}
    >
      <div className='sm:col-span-2'>
        <label className='mb-2 inline-block text-sm sm:text-base'>ユーザーネーム</label>
        <input
          name='name'
          defaultValue={user?.name}
          className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring'
        />
      </div>

      <div className='sm:col-span-2'>
        <label className='mb-2 inline-block text-sm sm:text-base'>プロフィール</label>
        <textarea
          name='profile'
          defaultValue={user?.profile}
          className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring'
        />
      </div>

      <div className='flex items-center justify-between sm:col-span-2'>
        <OutlinedButton>プロフィールを更新</OutlinedButton>
      </div>
    </form>
  )
}
