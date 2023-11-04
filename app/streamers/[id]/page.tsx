import OutlinedButton from '@/app/_components/button/OutlinedButton'
import Plan from '@/app/_components/listItem/Plan'
import { fetchAvailableDateTimesWithId } from '@/app/_services/availableDateTimeService'
import { fetchPlansWithId } from '@/app/_services/planService'
import { fetchStreamerWithId } from '@/app/_services/streamerService'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const streamerId = Number(params.id)
  const streamer = await fetchStreamerWithId(streamerId)
  const plans = await fetchPlansWithId(streamerId)
  const availableDateTimes = await fetchAvailableDateTimesWithId(streamerId)

  return (
    <>
      {streamer ? (
        <>
          <p>ユーザーネーム: {streamer.name}</p>
          <p>プロフィール: {streamer.profile}</p>
          {plans && (
            <>
              <p>プラン一覧</p>
              {plans.length === 0 ? (
                <p>プランがありません</p>
              ) : (
                <>
                  {plans.map((plan) => (
                    <>
                      <Plan key={plan.id} plan={plan} />
                    </>
                  ))}
                </>
              )}
            </>
          )}
          {availableDateTimes && (
            <>
              <p>予約可能日時一覧</p>
              {availableDateTimes && availableDateTimes.length === 0 ? (
                <p>予約可能日時がありません</p>
              ) : (
                <p>予約可能日時のUIを表示します</p>
              )}
            </>
          )}
          <Link href={`/streamers/${streamer.id}/reservation/create`}>
            <OutlinedButton>予約する</OutlinedButton>
          </Link>
        </>
      ) : (
        <p>お探しのストリーマーは存在しません</p>
      )}
    </>
  )
}
