import prisma from '@/app/_lib/prisma'
import { AuthApiError } from '@supabase/supabase-js'

export const useUser = () => {
  /**
   * ユーザー情報をDBに登録.
   */
  const registUser = async (name: string, email: string) => {
    'use server'

    try {
      await prisma.$connect()
      const user = await prisma.user.create({
        data: {
          name: name.toString(),
          email: email.toString(),
          iconUrl: '',
          profile: '',
          reservations: undefined,
          isAdmin: false,
          isStreamer: false,
          plans: undefined,
          availableDateTimes: undefined,
        },
      })

      return user
    } catch (error) {
      throw new AuthApiError('Failed to operate database.', 500)
    } finally {
      await prisma.$disconnect()
    }
  }

  return { registUser }
}
