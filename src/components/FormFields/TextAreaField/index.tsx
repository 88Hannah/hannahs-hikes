import { type ChangeEvent, useState, useEffect } from "react"

interface TextAreaFieldProps {
    name: string,
    label: string,
    onValueChange: (name: string, value: string) => void
}

export default function TextAreaField({ name, label, onValueChange }: TextAreaFieldProps) {

  const [fieldValue, setFieldValue] = useState<string>("")

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(e.target.value)
  }

  useEffect(() => {
    onValueChange(name, fieldValue)
  }, [fieldValue])

    return (
        <div className="col-span-full">
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
          <div className="mt-2">
            <textarea 
              id={name} 
              name={name} 
              value={fieldValue}
              onChange={onChange}
              rows={3} 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
    )
}