import prisma from '@/app/_lib/prisma'

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
export const registUser = async (name: string, email: string, isStreamer: boolean) => {
  'use server'

  try {
    await prisma.$connect()
    const user = await prisma.user.create({
      data: {
        name: name.toString(),
        email: email.toString(),
        iconUrl: '',
        profile: '',
        reservations: undefined,
        isAdmin: false,
        isStreamer: isStreamer,
        plans: undefined,
        availableDateTimes: undefined,
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
export const editUser = async (id: number, name: string, profile: string) => {
  'use server'

  try {
    await prisma.$connect()
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name.toString(),
        profile: profile.toString(),
      },
    })

    return user
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
