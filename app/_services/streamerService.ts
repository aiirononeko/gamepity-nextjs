import { AuthApiError } from '@supabase/supabase-js'

import prisma from '@/app/_lib/prisma'

/**
 * ストリーマーユーザー情報一覧を取得.
 */
export const fetchStreamers = async () => {
  'use server'

  try {
    await prisma.$connect()
    const streamers = await prisma.user.findMany({ where: { isStreamer: true } })
    return streamers
  } catch (error) {
    console.error(error)
    throw new AuthApiError('Failed to operate database.', 500)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたIDのストリーマー情報を取得.
 */
export const fetchStreamerWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: {
        id: id,
        isStreamer: true,
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
 * 指定されたIDのストリーマーに紐づくコース情報を取得.
 */
export const fetchCourseWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const courses = await prisma.plan.findMany({
      where: {
        userId: id,
      },
    })
    return courses
  } catch (error) {
    throw new AuthApiError('Failed to operate database.', 500)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたIDのストリーマーに紐づく予約可能日時情報を取得.
 */
export const fetchAvailableDateTimeWithId = async (id: number) => {
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
