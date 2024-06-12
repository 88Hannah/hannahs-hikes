import { type ChangeEvent, useState, useEffect } from "react"

interface SelectData {
  value: string,
  disabled: boolean,
  selected: boolean
}

interface SelectFieldProps {
  name: string,
  label: string,
  options: Array<SelectData>,
  value: string;
  onValueChange: (name: string, value: string) => void
}

export default function SelectField({ name, label, options, value, onValueChange }: SelectFieldProps) {

  const [fieldValue, setFieldValue] = useState<string>(value)

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(e.target.value)
  }

  useEffect(() => {
    onValueChange(name, fieldValue)
  }, [fieldValue])

  useEffect(() => {
    setFieldValue(value)
  }, [value])

  const optionsHtml = options.map((option, index) => {
    if(option.disabled) {
      return <option key={index} value={option.value} disabled>{option.value}</option>
    } else {
      return <option key={index} value={option.value}>{option.value}</option>
    }
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
          {optionsHtml}
        </select>
      </div>
    </div>

  )
}



