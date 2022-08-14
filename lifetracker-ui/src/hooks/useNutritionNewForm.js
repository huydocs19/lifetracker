import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useNutritionContext } from "contexts/nutrition"

export const useNutritionNewForm = () => {
  const { setNutritions } = useNutritionContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    calories: 1,
    quantity: 1,
    category: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async () => {
    setIsLoading(true)

    const { data, error } = await apiClient.createNutrition(form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.nutrition) {
      setNutritions((e) => [data.nutrition, ...e])
      setIsLoading(false)
      navigate("/nutrition")
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