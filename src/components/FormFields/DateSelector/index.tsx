import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { convertToUtcTime } from "@/utils/dateUtils"

interface DateSelectorProps {
    label: string,
    id: string,
    onValueChange: (name: string, value: string | number) => void
}

export default function DateSelector({ label, id, onValueChange }: DateSelectorProps) {

    const [ time, setTime ] = useState(new Date())

    useEffect(() => {
        onValueChange(id, convertToUtcTime(time))
    }, [time])

    return (
        <>
            <p>Date picker ...</p>
            {/* Check out for personalised icon: https://reactdatepicker.com/#example-calendar-icon-using-external-lib */}
            {label && <label htmlFor={id}>{label}</label>}
            <DatePicker
                selected={time}
                onChange={(date) => setTime(date)}
                showTimeSelect
                showIcon
                timeFormat="HH:mm"
                minDate={new Date()}
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                id={id}
            />
        </>
    )
}