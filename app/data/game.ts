import { supabase } from '@/app/service/supabase'
import { Database } from '@/supabase/schema'

type Game = Database['public']['Tables']['Game']['Row']

export async function getGames(): Promise<Game[]> {
  const { data, error } = await supabase.from('games').select('*')
  return data ?? []
}
