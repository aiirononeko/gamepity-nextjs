import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createReservation } from '@/actions/reservation'
import { BreadCrumb } from '@/components/BreadCrumb'
import { getCurrentUser } from '@/data/auth'
import { getAvailableDateTime } from '@/data/availableDateTime'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import { addHour, format, tzDate } from '@formkit/tempo'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const plan = await getPlan(Number(searchParams.planId))
  const availableDateTime = await getAvailableDateTime(
    Number(searchParams.availableDateTimeId),
  )
  const streamer = await getStreamer(plan.streamer_id)

  const jstStartDateTime = tzDate(availableDateTime.start_date_time, 'Asia/Tokyo')
  const jstEndDateTime = addHour(jstStartDateTime, 1)

  return (
    <div className='container mx-auto'>
      <BreadCrumb>← 予約可能日時選択に戻る</BreadCrumb>
      <form action={createReservation}>
        <h2 className='mb-6 text-2xl font-bold text-game-white'>予約内容の確認</h2>
        <div className='flex flex-row px-32 pb-12'>
          {streamer.icon_url ? (
            <div className='relative mx-auto h-72 w-80 basis-2/5'>
              <Image
                alt={`${streamer.name}のアイコン`}
                src={streamer.icon_url}
                fill={true}
              />
            </div>
          ) : (
            <div className='relative mx-auto h-72 w-80 basis-2/5 bg-game-gray-600'></div>
          )}
          <div className='relative flex basis-3/5 flex-col space-y-6 pl-10'>
            <p className='basis-1/6 text-3xl font-bold text-game-white'>
              {streamer.name}
            </p>
            <p className='basis-1/6 text-xl font-bold text-game-white'>{plan.name}</p>
            <p className='basis-3/6 text-game-white'>{plan.description}</p>
            <p className='basis-1/6 text-xl font-bold text-game-white'>
              {jstStartDateTime.toLocaleString()} ~ {jstEndDateTime.toLocaleString()}
            </p>
            <p className='basis-1/6 text-xl font-bold text-game-white'>
              {plan.amount}円 / 60分
            </p>
          </div>
        </div>
        <div className='mb-10 flex justify-center'>
          <a
            className='text-center font-bold text-game-white underline hover:text-blue-500'
            target='_blank'
            href='https://brash-ferry-996.notion.site/54ac9ecf2f41440dac1744f1bc94aedc'
          >
            ※ご購入前に予約時の注意事項をご確認ください
          </a>
        </div>
        <input name='availableDateTimeId' value={availableDateTime.id} hidden readOnly />
        <input
          name='startDateTime'
          value={availableDateTime.start_date_time}
          hidden
          readOnly
        />
        <input name='streamerId' value={streamer.id} hidden readOnly />
        <input name='userId' value={user.id} hidden readOnly />
        <input name='planId' value={plan.id} hidden readOnly />
        <input
          name='stripeAccountId'
          value={streamer.stripe_account_id ?? ''}
          hidden
          readOnly
        />
        <input name='stripePriceId' value={plan.stripe_price_id} hidden readOnly />
        <input name='amount' value={plan.amount} hidden readOnly />
        <div className='flex justify-center'>
          <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white hover:-translate-y-1'>
            この内容で予約する
          </button>
        </div>
      </form>
    </div>
  )
}
