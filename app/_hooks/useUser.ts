import prisma from '@/app/_lib/prisma'
import { AuthApiError } from '@supabase/supabase-js'

/**
 * ユーザー情報をDBに登録.
 */
export const registUser = async (name: string, email: string) => {
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

/**
 * 指定されたユーザー情報を取得.
 */
export const fetchUser = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    return user
  } catch (error) {
    throw new AuthApiError('Failed to operate database.', 500)
  } finally {
    await prisma.$disconnect()
  }
}
