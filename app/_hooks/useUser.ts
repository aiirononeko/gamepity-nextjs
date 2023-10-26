import prisma from '@/app/_lib/prisma'

export const useUser = () => {
  /**
   * ユーザー情報をDBに登録.
   */
  const registUser = async (name: string, email: string) => {
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
          isStreamer: false,
          plans: undefined,
          availableDateTimes: undefined,
        },
      })

      console.log(user) // TODO
    } catch (err) {
      console.log(err) // TODO
    } finally {
      await prisma.$disconnect()
    }
  }

  return { registUser }
}
