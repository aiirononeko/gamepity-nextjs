import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/supabase/schema'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
)
