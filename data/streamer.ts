'use server'

import { createClient } from '@/lib/supabase/server'
import { searchStreamersSchema } from '@/schemas/streamer'
import type { Streamer } from '@/types/streamer'

/**
 * トップページに表示するストリーマーを取得します
 */
export async function getStreamers(): Promise<Streamer[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('streamers')
    .select()
    .neq('icon_url', null)
    .neq('discord_url', null)
    .neq('profile', null)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data ?? []
}

export async function getStreamer(id: string): Promise<Streamer> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('streamers')
    .select(`*, reviews (*), plans (*), available_date_times (*)`)
    .eq('id', id)
    .limit(1)
    .single()
  if (error) {
    console.error(error)
    throw error
  }

  return data
}

export const getStreamersWithGameTitle = async (gameId: number) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('streamers')
    .select(
      `
      *, streamer_games!inner (
        game_id (
          *
        )
      ) 
    `,
    )
    .eq('streamer_games.game_id', gameId)
    .neq('icon_url', null)
    .neq('discord_url', null)
    .neq('profile', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw error
  }
  return data
}

export const searchStreamers = async (name: string) => {
  const result = searchStreamersSchema.safeParse({ name })
  if (!result.success) return

  const supabase = createClient()

  const { data, error } = await supabase
    .from('streamers')
    .select()
    .ilike('name', `%${name}%`)
    .neq('icon_url', null)
    .neq('discord_url', null)
    .neq('profile', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw error
  }

  return data
}
