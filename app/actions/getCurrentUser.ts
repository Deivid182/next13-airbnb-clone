import { getServerSession } from 'next-auth/next'
import prisma from "@/app/libs/prismadb"
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function getSession() {
  return await getServerSession(authOptions)
} 

export default async function getCurrentUser(){
  try {
    const session = await getSession()

    if(!session?.user?.email) return null
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })
    
    return currentUser
  } catch (error: any) {
    return null
  }
}