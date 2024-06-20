import { type ChangeEvent, useState, useEffect } from "react"

interface CheckboxProps {
    name: string
    label: string,
    isSelected: boolean

    onCheckboxChange: (name: string, value: boolean) => void
}


export default function Checkbox({ name, label, isSelected, onCheckboxChange }: CheckboxProps) {

    const [ isChecked, setIsChecked ] = useState<boolean>(isSelected)

    const toggleCheckboxChange = () => {
        setIsChecked(prevIsChecked => {
            return !prevIsChecked
        })
    }

    useEffect(() => {
        setIsChecked(isSelected)
    }, [isSelected])

    useEffect(() => {
        onCheckboxChange(name, isChecked)
    }, [isChecked])

    return (
        <div className="checkbox">
        <label>
        <input
                            type="checkbox"
                            value={label}
                            checked={isChecked}
                            onChange={toggleCheckboxChange}
                        />

        {label}
        </label>
        </div>
    )
}