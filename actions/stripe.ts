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
    type: 'express',
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
    unit_amount: amount,
    currency: 'jpy',
    product: product.id,
  })

  return {
    stripeProductId: product.id,
    stripePriceId: price.id,
  }
}

export const createStripePaymentLink = async (
  stripePriceId: string,
  userId: string,
  streamerId: string,
) => {
  const stripe = createClient()
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    // application_fee_percent: 0, // TODO: Betaが完了したら修正する
    metadata: {
      userId,
      streamerId,
    },
    after_completion: {
      type: 'redirect',
      redirect: {
        url: 'https://www.gamepity.com/users/mypage',
      },
    },
  })
  return paymentLink
}

export const createLoginLink = async (
  stripeAccountId: string,
): Promise<Stripe.Response<Stripe.LoginLink> | undefined> => {
  const stripe = createClient()

  if (!stripeAccountId) return

  const hasDetailsSubmitted = await hasDetailsSubmittedToStripe(stripeAccountId)
  if (!hasDetailsSubmitted) return

  return await stripe.accounts.createLoginLink(stripeAccountId)
}
