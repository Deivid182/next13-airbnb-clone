"use client"

import useCountries from "@/app/hooks/useCountries"
import { Listing, User } from "@prisma/client"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"
import { useMemo } from "react"


interface ListingInfoProps {
  user: User
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  locationValue: string
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, guestCount, bathroomCount, category, locationValue, roomCount }) => {

  const MapComponent = useMemo(() => dynamic(() => import("../MapComponent"), {
    ssr: false
    }), [])  

  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name} </div>
          <Avatar 
            src={user?.image}
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-400">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory 
          icon={category.icon}
          label={category.label}
          description={category.description}    
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500 ">
        {description}
      </div>
      <hr />
      <MapComponent center={coordinates || [0, 0]}/>
    </div>
  )
}

export default ListingInfo