"use client"

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import ListingInfo from "./ListingInfo";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: User | null
  id: string
}

const ListingHead: React.FC<ListingHeadProps> = ({ 
  title, locationValue, imageSrc, currentUser, id
}) => {

  const { getByValue } = useCountries()
  const location = getByValue(locationValue)


  return (
    <>
      <Heading 
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image 
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="image listing"
        />
        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead