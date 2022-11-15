import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

const useForm: 
<T>(initial: T) => [ 
  T, 
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  () => void,
  Dispatch<SetStateAction<T>>
]
= (initial) => {
  
  const [form, setForm] = useState<any>(initial)
  const clearForm = () => setForm(initial)
  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return [ form, setValue, clearForm, setForm ]

}

export default useForm
