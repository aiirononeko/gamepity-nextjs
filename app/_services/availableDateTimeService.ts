import prisma from '@/app/_lib/prisma'
import { AvailableDateTime } from '@prisma/client'

interface CreateAvailableDateTimeInput {
  startDateTime: Date
  userId: number
}

interface UpdateAvailableDateTimeInput {
  id: number
  startDateTime: Date
}

/**
 * 指定されたIDの予約可能日時情報を取得.
 */
export const fetchAvailableDateTimeWithId = async (
  id: number,
): Promise<AvailableDateTime | undefined> => {
  'use server'

  try {
    await prisma.$connect()
    const availableDateTime = await prisma.availableDateTime.findFirst({
      where: {
        id,
      },
    })
    if (availableDateTime) {
      return availableDateTime
    }
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたIDのストリーマーに紐づく予約可能日時情報を取得.
 */
export const fetchAvailableDateTimesWithStreamerId = async (
  id: number,
): Promise<AvailableDateTime[] | undefined> => {
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
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたIDのストリーマーに紐づく予約可能日時情報を作成.
 */
export const createAvailableDateTime = async (
  availableDateTime: CreateAvailableDateTimeInput,
) => {
  'use server'

  const { startDateTime, userId } = availableDateTime

  try {
    await prisma.$connect()
    const availableDateTimes = await prisma.availableDateTime.create({
      data: {
        startDateTime,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return availableDateTimes
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたIDのストリーマーに紐づく予約可能日時情報を更新.
 */
export const updateAvailableDateTime = async (
  availableDateTime: UpdateAvailableDateTimeInput,
) => {
  'use server'

  const { id, startDateTime } = availableDateTime

  try {
    await prisma.$connect()
    const availableDateTimes = await prisma.availableDateTime.update({
      where: {
        id,
      },
      data: {
        startDateTime,
        updatedAt: new Date(),
      },
    })
    return availableDateTimes
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
}
