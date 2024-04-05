import { Database } from "@/supabase/schema";
import { createClient } from "../service/supabase/server";

type AvailableDateTime = Database['public']['Tables']['available_date_times']['Row']

export async function getAvailableDateTimes(streamerId: string): Promise<AvailableDateTime[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('available_date_times').select('*').eq('streamer_id', streamerId).limit(1)

  if (error) {
    throw Error(error.message)
  }

  return data ?? []
}
