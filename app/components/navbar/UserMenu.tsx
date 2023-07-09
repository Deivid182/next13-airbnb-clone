"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { signOut } from "next-auth/react"
import useRentModal from "@/app/hooks/useRentModal"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const onRent = useCallback(() =>{
    if(!currentUser) return loginModal.onOpen()

    rentModal.onOpen()
  }, [currentUser, loginModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="hidden sm:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
            Airbnb your home
        </div>
        <div 
          className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen} 
        >
          <AiOutlineMenu size={18}/>
          <div className="hidden sm:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem 
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem 
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <MenuItem 
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem 
                  onClick={loginModal.onOpen}
                  label="Airbnb my home"
                />
                <MenuItem 
                  onClick={() => signOut()}
                  label="Log Out"
                />
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={loginModal.onOpen}
                  label="Login"
                />
                <MenuItem 
                  onClick={registerModal.onOpen}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu