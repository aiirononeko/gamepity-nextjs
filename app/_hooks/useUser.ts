import prisma from '@/app/_lib/prisma'

export const useUser = () => {
  /**
   * ユーザー情報をDBに登録.
   */
  const registUser = async (email: string) => {
    'use server'

    try {
      await prisma.$connect()
      const user = await prisma.user.create({
        data: {
          name: '',
          email: email,
          iconUrl: '',
          profile: '',
          reservations: undefined,
          isAdmin: false,
          isStreamer: false,
          plans: undefined,
          availableDateTimes: undefined,
        },
      })

      console.log(user)
    } catch (err) {
      console.log(err) // TODO
    } finally {
      await prisma.$disconnect()
    }
  }

  /**
   * ストリーマー情報をDBに登録.
   */
  const registStreamer = async (email: string) => {
    'use server'

    try {
      await prisma.$connect()
      const streamer = await prisma.user.create({
        data: {
          name: '',
          email: email,
          iconUrl: '',
          profile: '',
          reservations: undefined,
          isAdmin: false,
          isStreamer: true,
          plans: undefined,
          availableDateTimes: undefined,
        },
      })

      console.log(streamer)
    } catch (err) {
      console.log(err) // TODO
    } finally {
      await prisma.$disconnect()
    }
  }

  return { registUser, registStreamer }
}
