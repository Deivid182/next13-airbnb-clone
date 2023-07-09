import prisma from "@/libs/prismadb"

interface IParams {
  listingId?: string
}

export default async function getListingById(params: IParams) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId
      },
      include: {
        user: true,
      }
    })
  
    if(!listing) return null
    
    const formattedListing = {
      ...listing,
      user: {
        ...listing.user,
        password: undefined
      }
    }

    return formattedListing

  } catch (error: any) {
    throw new Error(error)
  }
} 