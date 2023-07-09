"use client"

import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { categories } from "../../components/navbar/Categories"
import Container from "../../components/Container"
import ListingHead from "../../components/listings/ListingHead"
import ListingInfo from "../../components/listings/ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { differenceInDays, eachDayOfInterval } from "date-fns"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingReservation from "@/app/components/listings/ListingReservation"
import { Range } from "react-date-range"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  reservations?: Reservation[]
  listing: Listing & {
    user: User
  }
  currentUser: User | null
}

const ListingClient: React.FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)

  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])

  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    
    let dates: Date[] = []
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })  
      dates = [...dates, ...range]
      console.log(range);
    })
    return dates
  }, [reservations])

  const onCreateReservation = useCallback(() => {
    if(!currentUser) return loginModal.onOpen()
    setIsLoading(true)
    axios.post("/api/reservations", {
      listingId: listing?.id,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      totalPrice
    })
    .then(() => {
      toast.success("Reservation created successfully")
      setDateRange(initialDateRange)
      /* redirect to trips */
      router.push("/trips")
    })
    .catch((error) => {
      toast.error("Something went wrong")
    })
    .finally(() => {
      setIsLoading(false)
    })
}, [totalPrice, dateRange, loginModal, currentUser, router, listing?.id])

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
      /* const days = (dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 3600 * 24)
      setTotalPrice(listing.price * days) */
      const daysCount = differenceInDays(dateRange.endDate, dateRange.startDate)
      if(daysCount && listing.price) {
        setTotalPrice(listing.price * daysCount)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-8">
          <ListingHead 
            title={listing.title}
            id={listing.id}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo 
              user={listing.user}
              category={category}
              bathroomCount={listing.bathroomCount}
              roomCount={listing.roomCount}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                disabledDates={disabledDates}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                onChange={(value) => setDateRange(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient