'use server'

import { createClient } from '@/app/service/supabase/server'

export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return user
}
