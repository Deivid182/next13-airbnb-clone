"use client"

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange, disabledDates }) => {

  return (
    <DateRange 
      rangeColors={["#262626"]}
      ranges={[value]}
      onChange={onChange}
      date={new Date()}
      minDate={new Date()}
      disabledDates={disabledDates}
      showDateDisplay={false}
      direction="vertical"
    />
  )
}

export default Calendar