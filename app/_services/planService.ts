import prisma from '@/app/_lib/prisma'

interface CreatePlanInput {
  name: string
  description: string
  amount: number
  userId: number
  gameId: number
  stripeProductId: string
  stripePriceId: string
  stripePaymentLinkId: string
}

/**
 * 指定されたIDのストリーマーに紐づくプラン情報を取得.
 */
export const fetchPlansWithId = async (id: number) => {
  'use server'

  try {
    await prisma.$connect()
    const plans = await prisma.plan.findMany({
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
 * 指定されたIDのストリーマーに紐づくプラン情報を作成.
 */
export const createPlan = async (plan: CreatePlanInput): Promise<void> => {
  'use server'

  const {
    name,
    description,
    amount,
    userId,
    gameId,
    stripeProductId,
    stripePriceId,
    stripePaymentLinkId,
  } = plan

  try {
    await prisma.$connect()
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plans: {
          create: [
            {
              name,
              description,
              amount,
              stripeProductId,
              stripePriceId,
              stripePaymentLinkId,
              game: {
                connect: {
                  id: gameId,
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
