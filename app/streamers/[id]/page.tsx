import {
  fetchAvailableDateTimesWithId,
  fetchPlansWithId,
  fetchStreamerWithId,
} from '@/app/_services/streamerService'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const streamerId = Number(params.id)
  const streamer = await fetchStreamerWithId(streamerId)
  const plans = await fetchPlansWithId(streamerId)
  const availableTimes = await fetchAvailableDateTimesWithId(streamerId)

  return (
    <>
      {streamer ? (
        <>
          <p>ユーザーネーム: {streamer.name}</p>
          <p>プロフィール: {streamer.profile}</p>
          {plans && plans.length === 0 ? (
            <p>プランがありません</p>
          ) : (
            <p>プランのリストアイテムを表示します</p>
          )}
          {availableTimes && availableTimes.length === 0 ? (
            <p>予約可能日時がありません</p>
          ) : (
            <p>予約可能日時のリストアイテムを表示します</p>
          )}
        </>
      ) : (
        <p>お探しのストリーマーは存在しません</p>
      )}
    </>
  )
}
