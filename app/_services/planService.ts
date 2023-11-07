import prisma from '@/app/_lib/prisma'

interface CreatePlanInput {
  name: string
  description: string
  amount: number
  userId: number
  gameId: number
  stripePriceId: string
}

interface UpdatePlanInput {
  id: number
  name: string
  description: string
  amount: number
  stripePriceId?: string
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

  const { name, description, amount, userId, gameId, stripePriceId } = plan

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
              stripePriceId,
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

/**
 * 指定されたIDのストリーマーに紐づくプラン情報を更新.
 */
export const updatePlan = async (plan: UpdatePlanInput): Promise<void> => {
  'use server'

  const { id, name, description, amount, stripePriceId } = plan

  try {
    await prisma.$connect()
    await prisma.plan.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        amount,
        stripePriceId,
      },
    })
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
