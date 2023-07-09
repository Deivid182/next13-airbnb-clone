"use client"
import { Listing, Reservation, User } from "@prisma/client"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCard from "../components/listings/ListingCard"

interface ReservationsClientProps {
  currentUser?: User | null
  reservations?: (Reservation & { listing: Listing })[]
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ currentUser, reservations = [] }) => {


  const [deletingId, setDeletingId] = useState("")
  const router = useRouter()

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled")
        router.refresh()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setDeletingId("") 
      })
  }, [router])

  return (
    <Container>
      <Heading 
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard 
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient