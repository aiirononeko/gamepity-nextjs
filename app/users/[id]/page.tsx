import OutlinedButton from '@/app/_components/button/OutlinedButton'
import { fetchUserWithId } from '@/app/_services/userService'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  // TODO: ここでマイページの持ち主であるユーザーを取得しているが、
  // ページにアクセスしてきているユーザーと区別するようにする
  const user = await fetchUserWithId(Number(params.id))
  if (!user) redirect('/')

  // TODO: 本実装
  const availableTimes = user.isStreamer ? [] : []

  return (
    <>
      <p>マイページ</p>
      {user.isStreamer && <p>ストリーマーユーザーです</p>}
      <p>ユーザーネーム: {user.name}</p>
      <p>プロフィール: {user.profile}</p>
      <Link href={`/users/${params.id}/edit`}>
        <OutlinedButton>プロフィールを編集</OutlinedButton>
      </Link>
      {availableTimes.length === 0 ? (
        <p>予約可能日時がありません</p>
      ) : (
        <p>予約可能日時があります</p>
      )}
      {user.isStreamer && (
        <Link href={`/users/${params.id}/availabletime/edit`}>
          <OutlinedButton>予約可能日時を登録</OutlinedButton>
        </Link>
      )}
    </>
  )
}
