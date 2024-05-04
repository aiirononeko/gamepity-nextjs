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

export async function getStreamersWithGameId(gameId: number): Promise<Streamer[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('streamers').select(
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
        streamer_id
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
  // .eq('games.id', gameId) // MEMO: これだとgames.idが1のデータだけを取得する、みたいな挙動になっていて、streamer自体は全件取得される

  // MEMO: CLIのfilterメソッドが使えたら消す
  const filteredData = data?.filter((streamer) => {
    return (
      streamer.games.filter((game) => {
        return game.id === gameId
      }).length > 0
    )
  })

  if (error) throw new Error(error.message)

  return filteredData ?? []
}

export async function getStreamer(id: string): Promise<Streamer> {
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
        streamer_id
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
    .single()

  const { data, error } = await streamersWithGamesQuery
  if (error) throw new Error(error.message)

  return data
}
