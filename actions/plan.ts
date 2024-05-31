'use server'

import { createStripeProductAndPrice } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { planSchema } from '@/schemas/plan'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

export const createPlan = async (data: z.infer<typeof planSchema>) => {
  const result = planSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const { name, description, amount, gameId, streamerId } = data
  try {
    const { stripeProductId, stripePriceId } =
      await createStripeProductAndPrice({
        name,
        amount: Number(amount),
      })

    const supabase = createClient()
    const { data, error } = await supabase
      .from('plans')
      .insert({
        streamer_id: streamerId,
        name,
        description,
        amount: Number(amount),
        stripe_product_id: stripeProductId,
        stripe_price_id: stripePriceId,
      })
      .select()
      .single()
    if (error) {
      console.error(error)
      throw error
    }

    await createPlansGames(data.id, Number(gameId))
  } catch (e) {
    console.error(e)
    throw e
  }

  redirect('/plans')
}

const createPlansGames = async (planId: number, gameId: number) => {
  const supabase = createClient()
  const { error } = await supabase.from('plans_games').insert({
    plan_id: planId,
    game_id: gameId,
  })
  if (error) throw error
}
