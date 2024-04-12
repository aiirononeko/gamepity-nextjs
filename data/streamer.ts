'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/supabase/schema'

type Streamer = Database['public']['Tables']['streamers']['Row']

export async function getStreamers(): Promise<Streamer[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('streamers').select('*')

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function getStreamer(id: string) {
  const supabase = createClient()
  const streamersWithGamesQuery = supabase
    .from('streamers')
    .select(
      `
      id,
      name,
      icon_url,
      profile,
      stripe_account_id,
      avg_rating,
      youtube_url,
      twitch_url,
      x_url,
      created_at,
      updated_at,
      games (
        id,
        name,
        description,
        icon_url,
        created_at,
        updated_at
      ),
      plans (
        id,
        name,
        description,
        amount,
        stripe_product_id,
        stripe_price_id,
        stripe_payment_link_id,
        created_at,
        updated_at,
        streamer_id,
        game_id
      ),
      reviews (
        id,
        rating,
        comment,
        created_at,
        streamer_id,
        user_id,
        plan_id
      )
    `,
    )
    .eq('id', id)
    .limit(1)

  const { data, error } = await streamersWithGamesQuery
  if (error) throw new Error(error.message)

  return data[0]
}
