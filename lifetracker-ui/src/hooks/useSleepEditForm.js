import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useSleepContext } from "contexts/sleep"
import {useSleepDetail} from "hooks/useSleepDetail"
import { formatSleepTime } from "utils/format"
import moment from "moment"

export const useSleepEditForm = (sleepId) => {
  const { setSleeps } = useSleepContext()
  const navigate = useNavigate()  
  const {sleep} = useSleepDetail(sleepId)    
  const [isLoading, setIsLoading] = useState(false)  
  const [form, setForm] = useState({
    startTime: "",
    endTime: "", 
  })  
  const [errors, setErrors] = useState({})  

  useEffect(() => {
    setForm({
        startTime: formatSleepTime(sleep.startTime) || "",
        endTime: formatSleepTime(sleep.endTime) || "", 
    })
  }, [sleep])
  const handleOnSubmit = async () => {
    setIsLoading(true)

    if (errors.endTime) {
      setIsLoading(false)
      return
    }

    const { data, error } = await apiClient.updateSleep(sleep.id, form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.sleep) {
      setSleeps((e) => {
        let result = []
        e.forEach((item) => {
          if (item.id === data.sleep.id) {
            result.push(data.sleep)
          } else {
            result.push(item)
          }
        })
        return result
      })
      setIsLoading(false)
      navigate(`/sleep/${sleep.id}`)
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
    sleep,
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