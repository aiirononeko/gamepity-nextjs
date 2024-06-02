import Stripe from 'stripe'

export const createClient = () => {
  return new Stripe(process.env.STRIPE_API_KEY ?? '')
}
