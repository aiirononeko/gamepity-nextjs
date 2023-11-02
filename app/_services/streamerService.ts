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
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
