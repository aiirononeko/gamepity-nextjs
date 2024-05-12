'use server'

import { createClient } from '@/lib/supabase/server'

type UpdateParams = {
  streamerId: string
  name?: string
  profile?: string
  youtubeUrl?: string
  twitchUrl?: string
  xUrl?: string
  discordUrl?: string
}

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

export const updateProfile = async ({
  streamerId,
  name,
  profile,
  youtubeUrl,
  twitchUrl,
  xUrl,
  discordUrl,
}: UpdateParams): Promise<void> => {
  const supabase = createClient()
  const { error } = await supabase
    .from('streamers')
    .update({
      name,
      profile,
      youtube_url: youtubeUrl,
      twitch_url: twitchUrl,
      x_url: xUrl,
      discord_url: discordUrl,
    })
    .eq('id', streamerId)
  if (error) throw error
}
