import { AuthApiError } from '@supabase/supabase-js'

import prisma from '@/app/_lib/prisma'

/**
 * 指定されたIDのストリーマーに紐づく予約可能日時情報を取得.
 */
export const fetchAvailableDateTimesWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const availableDateTimes = await prisma.availableDateTime.findMany({
      where: {
        userId: id,
      },
    })
    return availableDateTimes
  } catch (error) {
    throw new AuthApiError('Failed to operate database.', 500)
  } finally {
    await prisma.$disconnect()
  }
}
