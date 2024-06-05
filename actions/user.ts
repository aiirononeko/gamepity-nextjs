'use server'

import { createClient } from '@/lib/supabase/server'
import { userSchema } from '@/schemas/user'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'
import { manageImage } from './image-upload'

export const updateProfile = async (data: z.infer<typeof userSchema>) => {
  const result = userSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const { name, iconUrl, userId } = data

  const storagePath = await manageImage(supabase, iconUrl, userId)

  const { error } = await supabase
    .from('users')
    .update({
      name,
      icon_url: storagePath,
    })
    .eq('id', userId)
  if (error) throw error

  revalidatePath('/users/mypage')
}
