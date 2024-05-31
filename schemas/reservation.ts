import { z } from 'zod'

export const reservationSchema = z.object({
  availableDateTimeId: z.number(),
  planId: z.number(),
  startDateTime: z.string(),
  streamerId: z.string(),
  userId: z.string(),
  stripeAccountId: z.string(),
  stripePriceId: z.string(),
  streamerEmail: z.string(),
  streamerDiscordUrl: z.string(),
  userEmail: z.string(),
  hasConfirmedAndAgreedWithWarningInfo: z.literal(true, {
    errorMap: () => ({ message: '同意してください' }),
  }),
})
