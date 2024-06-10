import { type ChangeEvent, useState, useEffect } from "react"

interface SelectFieldProps {
  name: string,
  label: string,
  options: string[],
  onValueChange: (name: string, value: string) => void
}

export default function SelectField({ name, label, options, onValueChange }: SelectFieldProps) {

  const [fieldValue, setFieldValue] = useState<string>("instruction")

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.value)
  }

  useEffect(() => {
    onValueChange(name, fieldValue)
  }, [fieldValue])

  const optionsHtml = options.map((option, index) => {
    return <option key={index} value={option}>{option}</option>
  })

  return (
    <div className="sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <select 
          id={name} 
          name={name} 
          value={fieldValue}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option disabled value="instruction">Please select...</option>
          {optionsHtml}
        </select>
      </div>
    </div>

  )
}



