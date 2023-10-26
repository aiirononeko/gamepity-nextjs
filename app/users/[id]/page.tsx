import { fetchUser } from '@/app/_hooks/useUser'
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
      <p>ここはマイページです</p>
      <p>ユーザーネーム: {user.name}</p>
      <p>
        TODO: 自分のマイページの場合と他人のマイページの場合で表示内容を分けるようにする
      </p>
    </>
  )
}
