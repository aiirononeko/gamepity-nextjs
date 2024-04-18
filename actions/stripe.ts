import { createClient } from '@/lib/stripe'

type CreateParams = {
  name: string
  amount: number
}

type DeleteParams = {
  stripeProductId: string
  stripePriceId: string
}

const stripe = createClient()

export const createStripeProductAndPrice = async ({ name, amount }: CreateParams) => {
  const product = await stripe.products.create({
    name,
    description: `プラン名: ${name}`,
  })

  const price = await stripe.prices.create({
    unit_amount: amount * 100,
    currency: 'jpy',
    product: product.id,
  })

  return {
    stripeProductId: product.id,
    stripePriceId: price.id,
  }
}
