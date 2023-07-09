"use client"

interface ClientOnlyProps {
  children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export default ClientOnly