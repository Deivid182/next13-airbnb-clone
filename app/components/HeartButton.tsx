"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import useFavorite  from "../hooks/useFavorite"
import { User } from "@prisma/client"

interface HeartButtonProps {
  listingId: string
  currentUser?: User | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {

  const { hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser})

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer hover:opacity-70 transition"
    >
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
      <AiFillHeart size={24} className={hasFavorited ? "fill-red-500" : "fill-neutral-500/70"}/>
    </div>
  )
}

export default HeartButton