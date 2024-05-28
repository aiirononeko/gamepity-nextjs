'use server'

import { manageImage } from './image-upload'
import { createClient } from '@/lib/supabase/server'
import { streamerSchema } from '@/schemas/streamer'
import { z } from 'zod'

export const updateStripeAccountId = async (
  streamerId: string,
  stripeAccountId: string,
) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('streamers')
    .update({
      stripe_account_id: stripeAccountId,
    })
    .eq('id', streamerId)
  if (error) throw error
}

export const updateProfile = async (data: z.infer<typeof streamerSchema>) => {
  const result = streamerSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const { streamerId, name, profile, iconUrl, youtubeUrl, twitchUrl, xUrl, discordUrl } =
    data

  const storagePath = await manageImage(supabase, iconUrl, streamerId)

  const { error } = await supabase
    .from('streamers')
    .update({
      name,
      profile,
      icon_url: storagePath,
      youtube_url: youtubeUrl,
      twitch_url: twitchUrl,
      x_url: xUrl,
      discord_url: discordUrl,
    })
    .eq('id', streamerId)
  if (error) throw error
}
