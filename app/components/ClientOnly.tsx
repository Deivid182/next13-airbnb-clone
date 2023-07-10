"use client"

interface ClientOnlyProps {
  children: React.ReactNode
}

import { useEffect, useState } from "react"

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly