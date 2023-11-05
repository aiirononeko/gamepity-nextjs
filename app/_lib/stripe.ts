import Stripe from 'stripe'

const API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY
export const stripe = new Stripe(API_KEY ?? '')
