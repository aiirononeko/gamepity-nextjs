import { z } from 'zod'

export const streamerSchema = z.object({
  streamerId: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  profile: z.string().min(1).max(500).optional(),
  iconUrl: z.string().url().optional(),
  discordUrl: z.string().url().optional(),
  youtubeUrl: z.string().url().optional(),
  twitchUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
})

export const searchStreamersSchema = z.object({
  name: z.string().max(50),
})
