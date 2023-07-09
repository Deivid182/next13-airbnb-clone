"use client"

import { Range } from "react-date-range"
import Calendar from "../inputs/Calendar"
import Button from "../Button"

interface ListingReservationProps {
  price: number
  dateRange: Range
  totalPrice: number
  onChange: (dateRange: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({ 
  price, dateRange, totalPrice, onChange, onSubmit, disabled, disabledDates
 }) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden shadow-md">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="font-semibold text-2xl">${price} </div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value: any) => onChange(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled}
          label="Reserve"
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row justify-between items-center font-semibold text-lg">
        <div>Total</div>
        <div>${totalPrice} </div>
      </div>
    </div>
  )
}

export default ListingReservation