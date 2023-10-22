import prisma from '@/app/_lib/prisma'

export const useUser = () => {
  /**
   * ユーザー情報をDBに登録.
   */
  const registUser = async () => {
    'use server'

    try {
      await prisma.$connect()
      const user = await prisma.user.create({
        data: {
          name: '',
          email: '',
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

  // /**
  //  * ユーザー情報をDBに登録.
  //  */
  // const registUser = async (name: string, email: string) => {
  //   try {
  //     await prisma.$connect()
  //     const user = await prisma.user.create({
  //       data: {
  //         name: name,
  //         email: email,
  //         iconUrl: '',
  //         profile: '',
  //         reservations: undefined,
  //         isAdmin: false,
  //         isStreamer: false,
  //         plans: undefined,
  //         availableDateTimes: undefined,
  //       },
  //     })
  //
  //     console.log(user)
  //   } catch (err) {
  //     console.log(err) // TODO
  //   } finally {
  //     await prisma.$disconnect()
  //   }
  // }

  return { registUser }
}
