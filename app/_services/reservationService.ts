import prisma from '@/app/_lib/prisma'

interface CreateReservationInput {
  planId: string
  startDateTime: string
  streamerId: number
  userId: number
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

  const { planId, startDateTime, streamerId, userId } = plan

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
              startDateTime: new Date(startDateTime),
              endDateTime: new Date(startDateTime),
              planId,
              streamer: {
                connect: {
                  id: streamerId,
                },
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
