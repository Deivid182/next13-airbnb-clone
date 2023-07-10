import prisma from "@/app/libs/prismadb"

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
    
    console.log(listing);
    return listing
  
  } catch (error: any) {
    throw new Error(error)
  }
} 