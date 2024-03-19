import { createPlan } from '@/app/_services/planService'
import { stripe } from '@/app/_lib/stripe'

const createAction = async (formData: FormData) => {
  'use server'

  const name = formData.get('name')
  const description = formData.get('description')
  const amount = formData.get('amount')
  const userId = formData.get('userId')
  const stripeAccountId = formData.get('stripeAccountId')
  const gameId = formData.get('gameId')

  if (name && description && amount && userId && gameId && stripeAccountId) {
    // StripeのProductsを作成
    const product = await stripe.products.create({
      name: name.toString(),
    })

    // StripeのPriceを作成
    const price =
      product &&
      (await stripe.prices.create({
        unit_amount: Number(amount),
        currency: 'jpy',
        product: product.id,
      }))

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // StripeのPaymentLinkを作成
    const paymentLink =
      price &&
      (await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        currency: 'jpy',
        application_fee_amount: Number(amount) / 10,
        after_completion: {
          type: 'redirect',
          redirect: {
            url: baseUrl
              ? `${baseUrl}/streamers/${userId}/reservation/completed`
              : 'https://gamepity.com',
          },
        },
        transfer_data: {
          destination: stripeAccountId?.toString() ?? '', // TODO: ちゃんと動作してるか確認
        },
        metadata: {
          streamerId: userId.toString(),
          planId: '',
        },
      }))

    // DBにPlanデータ作成
    paymentLink &&
      (await createPlan({
        name: name.toString(),
        description: description.toString(),
        amount: Number(amount),
        userId: Number(userId),
        gameId: Number(gameId),
        stripeProductId: product.id,
        stripePriceId: price.id,
        stripePaymentLinkId: paymentLink.id,
      }))
  }
}

type Props = {
  userId: number
  stripeAccountId: string
}

export default function PlanForm(props: Props) {
  const { userId, stripeAccountId } = props

  return (
    <form className='w-full max-w-sm' action={createAction}>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            プラン名
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='name'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='1時間一緒に遊べるプラン'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            プランの説明
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='description'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-email'
            type='text'
            placeholder='このプランはホゲホゲです'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            プランの料金
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='amount'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-email'
            type='number'
            placeholder='1000'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            ゲーム
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='gameId'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-email'
            type='number'
            placeholder='1'
          />
        </div>
      </div>
      <input name='userId' hidden type='number' defaultValue={userId} />
      <input name='stripeAccountId' hidden type='text' defaultValue={stripeAccountId} />
      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className='focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none'
            type='submit'
          >
            プランを登録する
          </button>
        </div>
      </div>
    </form>
  )
}
