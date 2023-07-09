import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {

  const currentUser = await getCurrentUser()
  if(!currentUser) return NextResponse.error()

  const { listingId } = params

  if(!listingId || typeof listingId !== "string") return NextResponse.error()

  try {
    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id
      }
    })

    return NextResponse.json(listing)

  } catch (error: any) {
    return NextResponse.json({ error: error.message })  
  }
}