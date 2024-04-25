'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/stripe'
import Stripe from 'stripe'

type CreateProductParams = {
  name: string
  amount: number
}

export const createStripeAccount = async (
  email: string,
): Promise<Stripe.Response<Stripe.Account>> => {
  const stripe = createClient()
  const account = await stripe.accounts.create({
    type: 'standard',
    country: 'JP',
    email,
  })
  return account
}

export const hasDetailsSubmittedToStripe = async (
  stripeAccountId: string | null,
): Promise<boolean> => {
  if (!stripeAccountId) return false

  const stripe = createClient()
  const { details_submitted } = await stripe.accounts.retrieve(stripeAccountId)
  return details_submitted
}

export const linkToStripeAccount = async (formData: FormData) => {
  const stripeAccountId = formData.get('stripeAccountId')?.toString()
  if (!stripeAccountId) return

  const stripe = createClient()
  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: 'https://www.gamepity.com/streamers/mypage',
    return_url: 'https://www.gamepity.com/streamers/mypage',
    type: 'account_onboarding',
  })

  redirect(accountLink.url)
}

export const createStripeProductAndPrice = async ({
  name,
  amount,
}: CreateProductParams): Promise<{ stripeProductId: string; stripePriceId: string }> => {
  const stripe = createClient()
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

export const createStripePaymentLink = async (stripePriceId: string) => {
  const stripe = createClient()
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
  })
  return paymentLink
}
