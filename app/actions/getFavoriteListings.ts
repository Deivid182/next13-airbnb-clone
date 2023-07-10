import prisma from "@/app/libs/prismadb"

import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) return []


    const favoriteIds = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }  
    })

    return favoriteIds

  } catch (error: any) {
    throw new Error(error)
  }
}