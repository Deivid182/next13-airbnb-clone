"use client"
import { useCallback, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import useRegisterModal from "../../hooks/useRegisterModal"
import useLoginModal from "../../hooks/useLoginModal"

import { FcGoogle } from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import Button from "../Button"

import axios from "axios"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

const RegisterModal = () => {

  const [isLoading, setIsLoading] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  }) 

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post("/api/register", data)
      .then(() => {
        toast.success("Successfully registered!")
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error(error.response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleToggle = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading 
        title="Welcome to Airbnb"
        subtitle="Please sign up to continue"
      />
      <Input 
        id="name"
        label="Name"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="text"
        required
      />
      <Input 
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="email"
        required
      />
      <Input 
        id="password"
        label="Password"
        register={register}
        disabled={isLoading}
        errors={errors}
        type="password"
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label="Login with Google"
        onClick={() => signIn("google")}
        icon={ FcGoogle }
      />
      <Button 
        outline
        label="Login with Github"
        onClick={() => signIn("github")}
        icon={ AiOutlineGithub }
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div>Already have an account?</div>
          <div 
            onClick={handleToggle}
            className="text-neutral-800 cursor-pointer hover:underline">Log In</div>
        </div>
      </div>
    </div>
  )
    
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal