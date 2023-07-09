import prisma from "@/libs/prismadb"

interface IParams {
  userId?: string
}

export default async function getUserById(params: IParams) {
  const { userId } = params
  const user =  await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  return user
}