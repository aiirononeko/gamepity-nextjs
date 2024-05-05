'use server'

import { createClient } from '@/lib/supabase/server'
import type { Game } from '@/types/game'

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

export const getGamesWithPlanId = async (planId: number): Promise<Game[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans_games')
    .select('*')
    .eq('plan_id', planId)
  if (error) throw error

  const getRelatedGames = data.map(async (plansGame) => {
    return getGame(plansGame.game_id)
  })

  return await Promise.all(getRelatedGames)
}
