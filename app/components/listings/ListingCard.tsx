"use client"

import useCountries from "@/app/hooks/useCountries"
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from 'date-fns'
import Image from "next/image"
import HeartButton from "../HeartButton"
import Button from "../Button"

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  actionLabel?: string 
  disabled?: boolean
  actionId?: string
  currentUser?: User | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  data, reservation, onAction, actionLabel, disabled, actionId, currentUser
}) => {

  console.log(reservation);
  console.log(data);

  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(disabled) return

    onAction?.(actionId || "")
  }, [onAction, disabled, actionId])


  const price = useMemo(() => {
    if(reservation) return reservation.totalPrice
    return data.price
  
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if(!reservation) return null
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation])

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative rounded-xl overflow-hidden">
          <Image 
            fill
            src={data.imageSrc}
            alt={data.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3">
            <HeartButton 
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label} 
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price} </div>
          {!reservation && (
            <div className="font-light">night </div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button 
            small
            disabled={disabled}
            onClick={handleCancel}
            label={actionLabel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard