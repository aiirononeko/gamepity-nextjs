import prisma from '@/app/_lib/prisma'

interface CreateUserInput {
  name: string
  email: string
  isStreamer: boolean
}

interface UpdateUserInput {
  id: number
  name: string
  profile: string
  stripeAccountId?: string
}

/**
 * 指定されたIDのユーザー情報を取得.
 */
export const fetchUserWithId = async (id: number) => {
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
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * 指定されたメールアドレスのユーザー情報を取得.
 */
export const fetchUserWithEmail = async (email: string) => {
  'use server'

  try {
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * ユーザー情報をDBに登録.
 */
export const registUser = async (user: CreateUserInput) => {
  'use server'

  const { name, email, isStreamer } = user

  try {
    await prisma.$connect()
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        iconUrl: '',
        profile: '',
        reservations: undefined,
        isAdmin: false,
        isStreamer,
        stripeAccountId: '',
        plans: undefined,
        availableDateTimes: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return user
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * ユーザー情報を更新.
 */
export const editUser = async (user: UpdateUserInput) => {
  'use server'

  const { id, name, profile, stripeAccountId } = user

  try {
    await prisma.$connect()
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name.toString(),
        profile: profile.toString(),
        stripeAccountId: stripeAccountId ?? '',
        updatedAt: new Date(),
      },
    })

    return user
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
