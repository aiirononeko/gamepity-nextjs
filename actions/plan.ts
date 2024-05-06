'use server'

import { redirect } from 'next/navigation'
import { createStripeProductAndPrice } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { createPlanSchema } from '@/schemas/plan'
import { parseWithZod } from '@conform-to/zod'

export const createPlan = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: createPlanSchema,
  })
  if (submission.status !== 'success') return submission.reply()

  const { name, description, amount, gameIds, streamerId } = submission.value

  try {
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
      })
      .select()
      .single()
    if (error) return submission.reply({ formErrors: [error.message] })

    await createPlansGames(data.id, gameIds)
  } catch (e) {
    console.error(e)
    return submission.reply()
  }

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
  if (error) throw error
}
