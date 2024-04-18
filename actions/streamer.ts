'use client'

import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

type UpdateParams = {
  streamerId: string,
  name?: string,
  profile?: string,
  youtubeUrl?: string
  twitchUrl?: string
  xUrl?: string
}

export const updateProfile = async ({ streamerId, name, profile, youtubeUrl, twitchUrl, xUrl }: UpdateParams): Promise<void> => {
  const { error } = await supabase.from('streamers')
    .update({
      name,
      profile,
      youtube_url: youtubeUrl,
      twitch_url: twitchUrl,
      x_url: xUrl
    })
    .eq('id', streamerId)
  if (error) throw new Error(error.message)
}
