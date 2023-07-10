import prisma from "@/app/libs/prismadb"

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: number
  startDate?: string;
  endDate?: string;
  category?: string
}

export async function getListings(params : IListingParams) {

  try {

    const { userId, roomCount, bathroomCount, category, endDate, guestCount, locationValue, startDate } = params;

    let query: any = {}
    if (userId) {
      query.userId = userId;
    }

    if(category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if(startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate  }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    });

    return listings;

  } catch (error: any) {  
    throw new Error(error);
  }
}