"use client"

import useSearchModal from "@/app/hooks/useSearcModal";
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string"
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {

  const searchModal = useSearchModal();

  const router = useRouter()
  const params = useSearchParams()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  })
  
  const MapComponent = useMemo(() => dynamic(() => import("../MapComponent"), { ssr: false }), [location])

  const onBack = useCallback(() => {
    setStep(value => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep(value => value + 1)
  }, [])

  const onSubmit = useCallback( async () => {
    if(step !== STEPS.INFO) return onNext()

    let currentQuery = {}
    if(params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any  = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if(dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if(dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: "/", 
      query: updatedQuery
    }, { skipNull: true  })

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
    }, [router, params, location, step, guestCount, roomCount, bathroomCount, dateRange, searchModal])

  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO) return "Search"

    return "Next"
  } , [step])

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.LOCATION) return undefined
    
    return "Back"
  
  }, [step])


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go"
        subtitle="Find the perfect place to stay"
      />
      <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <MapComponent 
        center={location?.latlng}
      />
    </div>
  )

    if(step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="When do you wanna go"
            subtitle="Make sure you stay long enough"
          />
          <Calendar 
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      )
    }

    if(step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="What are you looking for"
            subtitle="Find the perfect place to stay"
          />
          <Counter 
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
            title="Guests"
            subtitle="How many people are staying?"
          />
          <hr />
          <Counter 
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
            title="Rooms"
            subtitle="How many rooms do you need?"
          />
          <hr />
          <Counter 
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
          />
        </div>
      )
    }

  return (
    <Modal 
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal