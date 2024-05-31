'use server'

import { createClient } from '@/lib/stripe'
import type Stripe from 'stripe'

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

export const createLinkToStripeAccountUrl = async (stripeAccountId: string) => {
  const stripe = createClient()
  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: 'https://www.gamepity.com/streamers/mypage',
    return_url: 'https://www.gamepity.com/streamers/mypage',
    type: 'account_onboarding',
  })

  return accountLink.url
}

export const createStripeProductAndPrice = async ({
  name,
  amount,
}: CreateProductParams): Promise<{
  stripeProductId: string
  stripePriceId: string
}> => {
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
  stripeAccountId: string,
  stripePriceId: string,
  reservationId: number,
  availableDateTimeId: number,
  streamerEmail: string,
  streamerDiscordUrl: string,
  userEmail: string,
) => {
  const stripe = createClient()
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    currency: 'jpy',
    application_fee_amount: 0, // TODO: Betaが完了したら修正する
    transfer_data: {
      destination: stripeAccountId,
    },
    metadata: {
      reservationId,
      availableDateTimeId,
      streamerEmail,
      streamerDiscordUrl,
      userEmail,
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
