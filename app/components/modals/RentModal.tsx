"use client"
import { useMemo, useState } from "react"
import useRentModal from "@/app/hooks/useRentModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Modal from "./Modal"
import CategoryInput from "../inputs/CategoryInput"
import Counter from "../inputs/Counter"
import Heading from "../Heading"
import ImageUpload from "../inputs/ImageUpload"

import { categories } from "../navbar/Categories"

import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Input from "../inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {

  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: { 
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      description: "",
      imageSrc: "",
      price: "",
      title: ""
    }
  })

  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const bathroomCount = watch("bathroomCount")
  const roomCount = watch("roomCount")
  const imageSrc = watch("imageSrc")

  const MapComponent = useMemo(() => dynamic(() => import("../MapComponent"), {
    ssr: false
    }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.PRICE) {
      return onNext()
    }
    setIsLoading(true)
    axios.post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully")
        router.refresh()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
        reset()
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.PRICE) {
      return "Create"
    } 
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Which of these best describes your place?"
        subtitle="Choose one"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto ">
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput 
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located?"
          subtitle="Help guests find your place"
        />
        <CountrySelect 
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <MapComponent center={location?.latlng}/>
      </div>
    )
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="What is the best description of your place?"
          subtitle="Describe your place in a few words"
        />
        <Counter 
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subtitle="How many people do you allow?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Upload a picture"
          subtitle="Show your guests what you are offering"
        />
        <ImageUpload 
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    )
  } 

  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Describe your place"
          subtitle="Tell your guests what you are offering"
        />
        <Input 
          id="title"
          label="Title"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          type="text"
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Now set ypur price"
          subtitle="how much do you charge per night"
        />
        {/* TODO: format price to currency and reject invalid input */}
        <Input 
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          formatPrice
          required
          register={register}
          errors={errors}
        />
      </div>
    )
  }

  return (
    <Modal 
      title="Airbnb your Home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default RentModal