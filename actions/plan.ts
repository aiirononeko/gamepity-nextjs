'use server'

import { createStripeProductAndPrice } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { planSchema } from '@/schemas/plan'
import type { SupabaseClient } from '@supabase/supabase-js'
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

    await createStreamerGames(supabase, streamerId, Number(gameId))
    await createPlansGames(supabase, data.id, Number(gameId))

    const count = await getPlansCount(supabase, streamerId)
    await updateStreamerPlansCount(supabase, streamerId, count)
    await updateGamePlansCount(supabase, gameId, count)
  } catch (e) {
    console.error(e)
    throw e
  }

  redirect('/plans')
}

const getPlansCount = async (supabase: SupabaseClient, streamerId: string) => {
  const { count, error } = await supabase
    .from('plans')
    .select('*', { count: 'exact', head: true })
    .eq('streamer_id', streamerId)

  if (error) {
    console.error(error)
    throw error
  }

  return count ?? 0
}

const updateStreamerPlansCount = async (
  supabase: SupabaseClient,
  streamerId: string,
  count: number,
) => {
  const { error } = await supabase
    .from('streamers')
    .update({ plans_count: count })
    .eq('id', streamerId)

  if (error) {
    console.error(error)
    throw error
  }
}

const updateGamePlansCount = async (
  supabase: SupabaseClient,
  gameId: string,
  count: number,
) => {
  const { error } = await supabase
    .from('games')
    .update({ plans_count: count })
    .eq('id', gameId)

  if (error) {
    console.error(error)
    throw error
  }
}

const createStreamerGames = async (
  supabase: SupabaseClient,
  streamerId: string,
  gameId: number,
) => {
  const { error } = await supabase.from('streamer_games').insert({
    streamer_id: streamerId,
    game_id: gameId,
  })
  if (error) {
    console.error(error)
    throw error
  }
}

const createPlansGames = async (
  supabase: SupabaseClient,
  planId: number,
  gameId: number,
) => {
  const { error } = await supabase.from('plans_games').insert({
    plan_id: planId,
    game_id: gameId,
  })
  if (error) throw error
}
