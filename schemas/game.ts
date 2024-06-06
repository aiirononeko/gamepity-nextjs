import { z } from 'zod'

export const searchGamesSchema = z.object({
  name: z.string().max(50),
})
