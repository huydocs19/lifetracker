import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useNutritionContext } from "contexts/nutrition"
import {useNutritionDetail} from "hooks/useNutritionDetail"

export const useNutritionEditForm = (nutritionId) => {
  const { setNutritions } = useNutritionContext()
  const navigate = useNavigate()  
  const {nutrition} = useNutritionDetail(nutritionId)    
  const [isLoading, setIsLoading] = useState(false)  
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    calories: 1,
    quantity: 1,
    category: "",   
  })  
  const [errors, setErrors] = useState({})  

  useEffect(() => {    
    setForm({
        name: nutrition.name || "",
        imageUrl: nutrition.imageUrl || "",
        calories: nutrition.calories || 1,
        quantity: nutrition.quantity || 1,
        category: nutrition.category || "", 
    })
  }, [nutrition])
  const handleOnSubmit = async () => {
    setIsLoading(true)

    const { data, error } = await apiClient.updateNutrition(nutrition.id, form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.nutrition) {
      setNutritions((e) => {
        let result = []
        e.forEach((item) => {
          if (item.id === data.nutrition.id) {
            result.push(data.nutrition)
          } else {
            result.push(item)
          }
        })
        return result
      })
      setIsLoading(false)
      navigate(`/nutrition/${nutrition.id}`)
    } else {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return {
    form,    
    nutrition,
    errors,
    isLoading,
    handleOnSubmit,
    handleOnChange,
  }
}