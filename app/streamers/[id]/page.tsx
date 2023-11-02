import { fetchStreamerWithId } from '@/app/_services/streamerService'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  // ストリーマーユーザー取得
  const streamer = await fetchStreamerWithId(Number(params.id))

  // TODO: 本実装
  const course = []
  const availableTimes = []

  return (
    <>
      {streamer ? (
        <>
          <p>ユーザーネーム: {streamer.name}</p>
          <p>プロフィール: {streamer.profile}</p>
          {course.length === 0 ? <p>コースがありません</p> : <p>コースがあります</p>}
          {availableTimes.length === 0 ? (
            <p>予約可能日時がありません</p>
          ) : (
            <p>予約可能日時があります</p>
          )}
        </>
      ) : (
        <p>お探しのストリーマーは存在しません</p>
      )}
    </>
  )
}
