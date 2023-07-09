"use client"
import { Listing, Reservation, User } from "@prisma/client"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
  listings: Listing[]
  currentUser?: User | null
}

const PropertiesClient: React.FC<TripsClientProps> = ({ listings, currentUser }) => {

  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted")
        router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      })
      .finally(() => {
        setDeletingId("")
      })
    }, [router])

  return (
    <Container>
      <Heading 
        title="My Properties"
        subtitle="List of your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard 
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel={deletingId === listing.id ? "Deleting..." : "Delete"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient