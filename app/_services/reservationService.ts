import prisma from '@/app/_lib/prisma'

interface CreateReservationInput {
  planId: string
  startDateTime: Date
  streamerId: number
  userId: number
  availableDateTimeIds: number[]
}

/**
 * 指定された一般ユーザーのIDに紐づく予約データを取得.
 */
export const fetchUserReservationWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const plans = await prisma.reservation.findMany({
      where: {
        userId: id,
      },
    })
    return plans
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたストリーマーユーザーのIDに紐づく予約データを取得.
 */
export const fetchStreamerReservationWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const plans = await prisma.reservation.findMany({
      where: {
        streamerId: id,
      },
    })
    return plans
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 予約データを作成.
 */
export const createReservation = async (plan: CreateReservationInput): Promise<void> => {
  'use server'

  const { planId, startDateTime, streamerId, userId, availableDateTimeIds } = plan

  // 基本的に1チケット1時間になるため、現状は固定で1時間加算した値をendDateTimeとする
  const endDateTime = new Date(startDateTime.setHours(startDateTime.getHours() + 1))

  try {
    await prisma.$connect()
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        reservations: {
          create: [
            {
              startDateTime: startDateTime,
              endDateTime: endDateTime,
              planId,
              createdAt: new Date(),
              updatedAt: new Date(),
              streamer: {
                connect: {
                  id: streamerId,
                },
              },
              availableDateTimes: {
                connect: availableDateTimeIds.map((availableDateTimeId: number) => {
                  return {
                    id: availableDateTimeId,
                  }
                }),
              },
            },
          ],
        },
      },
    })
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
