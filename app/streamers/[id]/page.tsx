import {
  fetchAvailableDateTimeWithId,
  fetchCourseWithId,
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
  const course = await fetchCourseWithId(streamerId)
  const availableTimes = await fetchAvailableDateTimeWithId(streamerId)

  return (
    <>
      {streamer ? (
        <>
          <p>ユーザーネーム: {streamer.name}</p>
          <p>プロフィール: {streamer.profile}</p>
          {course && course.length === 0 ? (
            <p>コースがありません</p>
          ) : (
            <p>コースのリストアイテムを表示します</p>
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
