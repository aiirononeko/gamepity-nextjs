import OutlinedButton from '@/app/_components/button/OutlinedButton'
import { createSupabaseClient } from '@/app/_lib/supabase'
import {
  fetchAvailableDateTimeWithId,
  fetchAvailableDateTimesWithStreamerId,
} from '@/app/_services/availableDateTimeService'
import { fetchPlanWithId, fetchPlansWithId } from '@/app/_services/planService'
import { fetchStreamerWithId } from '@/app/_services/streamerService'
import { fetchUserWithEmail } from '@/app/_services/userService'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { stripe } from '@/app/_lib/stripe'
import { createReservation } from '@/app/_services/reservationService'
import { AvailableDateTime } from '@prisma/client'

type Props = {
  params: {
    id: string
  }
}

const createAction = async (formData: FormData) => {
  'use server'

  const planId = formData.get('planId')
  const availableDateTimeId = formData.get('availableDateTimeId')
  const streamerId = formData.get('streamerId')
  const userId = formData.get('userId')

  if (planId && availableDateTimeId && streamerId && userId) {
    const plan = await fetchPlanWithId(Number(planId))
    const paymentLink = await stripe.paymentLinks.retrieve(
      plan?.stripePaymentLinkId ?? '',
    )

    const availableDateTime = await fetchAvailableDateTimeWithId(
      Number(availableDateTimeId),
    )
    if (availableDateTime) {
      // バックエンドで予約可能日時のトランザクションを実施するため
      // この時点で仮予約を作成する(isAvailable: false)
      await createReservation({
        planId: planId.toString(),
        startDateTime: availableDateTime.startDateTime,
        streamerId: Number(streamerId),
        userId: Number(userId),
        // 今後複数availableDateTimeIdを指定できるようにするかもだけど、一旦1つ
        availableDateTimeIds: [Number(availableDateTimeId)],
      })

      redirect(paymentLink.url)
    }
  }
}

export default async function Page({ params }: Props) {
  const cookieStore = cookies()
  const supabase = createSupabaseClient(cookieStore)

  const { data } = await supabase.auth.getSession()
  const { session } = data

  // ログインユーザー取得
  const me = session && (await fetchUserWithEmail(session.user.email!))
  if (!me) redirect('/') // TODO: 未ログイン時の挙動を実装する

  const streamerId = Number(params.id)
  const streamer = await fetchStreamerWithId(streamerId)
  const plans = await fetchPlansWithId(streamerId)
  const availableDateTimes = await fetchAvailableDateTimesWithStreamerId(streamerId)

  return (
    <>
      {streamer && (
        <>
          <p>{streamer.name}の予約ページです</p>
          <form action={createAction}>
            {plans && plans.length > 0 ? (
              <>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  プランを選択してください
                </label>
                <select
                  name='planId'
                  id='availableDateTime'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  {plans.map((plan) => (
                    <option value={plan.id} key={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p>利用可能なプランがありません</p>
            )}
            {availableDateTimes && availableDateTimes.length > 0 ? (
              <>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  予約可能日時を選択してください
                </label>
                <select
                  name='availableDateTimeId'
                  id='availableDateTime'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  {availableDateTimes.map((availableDateTime: AvailableDateTime) => (
                    <option value={availableDateTime.id} key={availableDateTime.id}>
                      {availableDateTime.startDateTime.toString()}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p>利用可能な予約可能日時がありません</p>
            )}
            <input name='streamerId' hidden type='number' defaultValue={streamer.id} />
            <input name='userId' hidden type='number' defaultValue={me.id} />
            <OutlinedButton type='submit'>この内容で予約する</OutlinedButton>
          </form>
        </>
      )}
    </>
  )
}
