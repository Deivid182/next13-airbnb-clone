"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {

  const router = useRouter()

  return (
    <Image 
      onClick={() => router.push("/")}
      width={100}
      height={100}
      style={{width: "auto"}}
      alt="logo"  
      priority
      className="hidden md:block cursor-pointer object-contain"
      src={"/logo.png"}
    />
  )
}

export default Logo