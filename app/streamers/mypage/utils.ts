import { hasDetailsSubmittedToStripe } from '@/actions/stripe'
import type { Streamer } from '@/types/streamer'

export const currentStep = async (
  streamer: Streamer,
  plansLength: number,
  availableDateTimesLength: number,
): Promise<number> => {
  // プロフィールに必要な情報が入っているか
  if (!hasCompletedSettingProfile(streamer)) return 0

  // Stripeにビジネス情報が登録されているか
  if (!hasDetailsSubmittedToStripe(streamer.stripe_account_id)) return 1

  if (plansLength === 0) return 2

  if (availableDateTimesLength === 0) return 3

  return 4
}

const hasCompletedSettingProfile = (streamer: Streamer) => {
  return streamer.icon_url && streamer.name && streamer.discord_url
}
