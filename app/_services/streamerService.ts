import prisma from '@/app/_lib/prisma'
import { User } from '@prisma/client'

/**
 * ストリーマーユーザー情報一覧を取得.
 */
export const fetchStreamers = async (): Promise<User[]> => {
  'use server'

  try {
    await prisma.$connect()
    const streamers: User[] | undefined = await prisma.user.findMany({
      where: { isStreamer: true },
    })
    if (!streamers) throw Error('Streamers is undefined.')
    return streamers
  } catch (e) {
    throw Error('Failed to fetch streamers.')
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
