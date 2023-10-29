import OutlinedButton from '@/app/_components/button/OutlinedButton'
import { fetchUser } from '@/app/_hooks/useUser'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const user = await fetchUser(Number(params.id))
  if (!user) redirect('/')

  return (
    <>
      <p>マイページ</p>
      <p>ユーザーネーム: {user.name}</p>
      <p>プロフィール: {user.profile}</p>
      <Link href={`/users/${params.id}/edit`}>
        <OutlinedButton>プロフィールを編集</OutlinedButton>
      </Link>
    </>
  )
}
