import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useNutritionContext } from "contexts/nutrition"
import { useAuthContext, selectIsUserAuthenticated } from "contexts/auth"
import apiClient from "services/apiClient"

export const useNutritionDetail = (nutritionId) => {
  const { setNutritions } = useNutritionContext()
  const { user, initialized } = useAuthContext()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [nutrition, setNutrition] = useState({})
  const navigate = useNavigate()

  const isAuthenticated = selectIsUserAuthenticated(user, initialized)

  useEffect(() => {
    const fetchNutrition = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.fetchNutritionById(nutritionId)
      if (error) setError(error)
      if (data?.nutrition) {
        setNutrition(data.nutrition)
      }

      setIsFetching(false)
    }

    if (isAuthenticated) {
        fetchNutrition()
    }
  }, [nutritionId, isAuthenticated])

  const deleteNutrition = async () => {
    setIsFetching(true)

    const { data, error } = await apiClient.deleteNutrition(nutritionId)
    if (error) setError(error)
    if (data?.nutrition) {
      setNutritions((n) => {
        let result = n.filter((item) => item.id !== data.nutrition.id)
        return result
      })      
      navigate("/nutrition")
    }
    setIsFetching(false)
  }

  return {
    error,
    nutrition,
    isFetching,
    deleteNutrition
  }
}