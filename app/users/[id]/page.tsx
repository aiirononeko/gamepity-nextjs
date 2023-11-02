import { cookies } from 'next/headers'
import Link from 'next/link'

import OutlinedButton from '@/app/_components/button/OutlinedButton'
import { createSupabaseClient } from '@/app/_lib/supabase'
import { fetchUserWithEmail, fetchUserWithId } from '@/app/_services/userService'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const cookieStore = cookies()
  const supabase = createSupabaseClient(cookieStore)

  const { data } = await supabase.auth.getSession()
  const { session } = data

  // ログインユーザー取得
  const me = session && (await fetchUserWithEmail(session.user.email!))

  // マイページの持ち主ユーザー取得
  const user = await fetchUserWithId(Number(params.id))

  // ログインユーザー自身のマイページかどうか
  const isMypage = me && user && user.id === me.id

  return (
    <>
      {user ? (
        <>
          <p>ユーザーネーム: {user.name}</p>
          <p>プロフィール: {user.profile}</p>
          {isMypage && (
            <>
              <Link href={`/users/${params.id}/edit`}>
                <OutlinedButton>プロフィールを編集</OutlinedButton>
              </Link>
            </>
          )}
        </>
      ) : (
        <p>お探しのユーザーは存在しません</p>
      )}
    </>
  )
}
