import Plan from '@/app/_components/listItem/Plan'
import { createSupabaseClient } from '@/app/_lib/supabase'
import { fetchAvailableDateTimesWithId } from '@/app/_services/availableDateTimeService'
import { fetchPlansWithId } from '@/app/_services/planService'
import { fetchStreamerWithId } from '@/app/_services/streamerService'
import { fetchUserWithEmail } from '@/app/_services/userService'
import { cookies } from 'next/headers'

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

  const streamerId = Number(params.id)
  const streamer = await fetchStreamerWithId(streamerId)
  const plans = await fetchPlansWithId(streamerId)
  const availableDateTimes = await fetchAvailableDateTimesWithId(streamerId)

  return (
    <>
      {streamer && (
        <>
          <p>プランを選択してください</p>
          {plans && plans.length > 0 ? (
            <>
              {plans.map((plan) => (
                <Plan key={plan.id} plan={plan} />
              ))}
            </>
          ) : (
            <p>利用可能なプランがありません</p>
          )}
          <p>予約可能日時を選択してください</p>
          {availableDateTimes && availableDateTimes.length > 0 ? (
            <>
              <p>予約可能日時のUI表示</p>
            </>
          ) : (
            <p>利用可能な予約可能日時がありません</p>
          )}
        </>
      )}
    </>
  )
}
