import { type FormEvent, useState, useEffect, useRef } from "react"

interface FileFieldProps {
  name: string,
  label: string,
  placeholder?: string,
  value: File | null
  onFileChange: (name: string, file: File | null) => void
}


export default function FileField({ name, label, placeholder, value, onFileChange }: FileFieldProps) {

  const [file, setFile] = useState<File | null>(value)

  const fileRef = useRef()

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const currentFile = event.currentTarget.files[0]
      if (currentFile) {
        setFile(currentFile)
      }
    }
  }

  useEffect(() => {
    onFileChange(name, file)
  }, [file])

  useEffect(() => {
    if(value == null) {
      setFile(value)
      fileRef.current.value = value
    }
  }, [value])

  return (
    <div className="sm:col-span-4">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="file"
            name={name}
            id={name}
            ref={fileRef}
            onChange={handleFileChange}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={placeholder ?? ""}
          />
        </div>
      </div>
    </div>
  )
}