"use client"
import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearcModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {

  const searchModal = useSearchModal();
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = params?.get("locationValue")
  const startDate = params?.get("startDate")
  const endDate = params?.get("endDate")
  const guestCount = params?.get("guestCount")

  const locationLabel = useMemo(() => {
    if(locationValue) return getByValue(locationValue as string)?.label
    return "Anywhere"
  }, [locationValue])

  const durationLabel = useMemo(() => {
    if(startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diff = differenceInDays(end, start)

      return `${diff} days`
    } 

    return "Anyweek"
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if(guestCount) return `${guestCount} guests`
    return "Add guests"
  }, [guestCount])

  return (
    <div 
      onClick={searchModal.onOpen}
      className="border-x-[1px] w-full md:w-auto py-2 rounded-full shadow-sm md:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          {locationLabel}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel} </div>
          <div className="p-2 bg-rose-500 rounded-full">
            <BiSearch size={18} color="white"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search