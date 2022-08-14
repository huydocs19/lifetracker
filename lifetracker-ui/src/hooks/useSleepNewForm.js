import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useSleepContext } from "contexts/sleep"
import moment from "moment"

export const useSleepNewForm = () => {
  const { setSleeps } = useSleepContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async () => {
    setIsLoading(true)

    if (errors.endTime) {
      setIsLoading(false)
      return
    }

    const { data, error } = await apiClient.createSleep(form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.sleep) {
      setSleeps((e) => [data.sleep, ...e])
      setIsLoading(false)
      navigate("/sleep")
    } else {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    const { startTime, endTime } = form
    const { name, value } = e.target

    const isValid = name === "endTime" ? inputsAreValid(startTime, value) : inputsAreValid(value, endTime)

    if (!isValid) {
      setErrors((e) => ({ ...e, endTime: `End time must be after start time.` }))
    } else {
      setErrors((e) => ({ ...e, endTime: null }))
    }
    setForm((f) => ({ ...f, [name]: value }))
  }

  return {
    form,
    errors,
    isLoading,
    handleOnSubmit,
    handleOnChange,
  }
}

const inputsAreValid = (startTime, endTime) => {
  // haven't entered everything in yet
  if (!startTime || !endTime) return true

  if (moment(startTime).isSameOrAfter(endTime)) return false

  return true
}