import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useExerciseContext } from "contexts/exercise"

export const useExerciseNewForm = () => {
  const { setExercises } = useExerciseContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    duration: 1,
    intensity: 1,
    category: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async () => {
    setIsLoading(true)

    const { data, error } = await apiClient.createExercise(form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.exercise) {
      setExercises((e) => [data.exercise, ...e])
      setIsLoading(false)
      navigate("/exercise")
    } else {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return {
    form,
    errors,
    isLoading,
    handleOnSubmit,
    handleOnChange,
  }
}