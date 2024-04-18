'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createStripeProductAndPrice } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'

export const createPlan = async (formData: FormData) => {
  const streamerId = formData.get('streamerId')?.toString()
  const gameIds = formData.getAll('gameIds')
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const amount = Number(formData.get('amount'))

  if (
    !streamerId ||
    !gameIds ||
    gameIds.length === 0 ||
    !name ||
    !description ||
    !amount
  ) {
    console.error(
      `invalid input values: ${streamerId}, ${gameIds}, ${name}, ${description}, ${amount}`,
    )
    return
  }

  const { stripeProductId, stripePriceId } = await createStripeProductAndPrice({
    name,
    amount,
  })

  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .insert({
      streamer_id: streamerId,
      name,
      description,
      amount,
      stripe_product_id: stripeProductId,
      stripe_price_id: stripePriceId,
      stripe_payment_link_id: '',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    })
    .select()
    .single()
  if (error) throw new Error(error.message)

  createPlansGames(data.id, gameIds)

  revalidatePath('/streamers/mypage')
  redirect('/streamers/mypage')
}

const createPlansGames = async (planId: number, gameIds: FormDataEntryValue[]) => {
  const supabase = createClient()
  const relationRecords = gameIds.map((gameId) => {
    return {
      plan_id: planId,
      game_id: Number(gameId),
    }
  })

  const { error } = await supabase.from('plans_games').insert(relationRecords)
  if (error) throw new Error(error.message)
}
