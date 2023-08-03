"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick?: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, label, selected, onClick }) => {

  //console.log(selected);
  return (
    <div 
      onClick={() => onClick && onClick(label)}
      className={`
      cursor-pointer rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition-colors 
      ${selected ? " border-black" : "border-neutral-200"}
    `}>
      <Icon size={30}/>
      <div className="font-black">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput