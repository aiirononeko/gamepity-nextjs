'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/supabase/schema'

type Game = Database['public']['Tables']['games']['Row']

export async function getGames(): Promise<Game[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('games').select('*')

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function getGame(gameId: number): Promise<Game> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .limit(1)
    .single()

  if (error) throw new Error(error.message)

  return data
}
