import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useExerciseContext } from "contexts/exercise"
import { useAuthContext, selectIsUserAuthenticated } from "contexts/auth"
import apiClient from "services/apiClient"

export const useExerciseDetail = (exerciseId) => {
  const { setExercises } = useExerciseContext()
  const { user, initialized } = useAuthContext()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [exercise, setExercise] = useState({})
  const navigate = useNavigate()

  const isAuthenticated = selectIsUserAuthenticated(user, initialized)

  useEffect(() => {
    const fetchExercise = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.fetchExerciseById(exerciseId)
      if (error) setError(error)
      if (data?.exercise) {
        setExercise(data.exercise)
      }

      setIsFetching(false)
    }

    if (isAuthenticated) {
      fetchExercise()
    }
  }, [exerciseId, isAuthenticated])

  const deleteExercise = async () => {
    setIsFetching(true)

    const { data, error } = await apiClient.deleteExercise(exerciseId)
    if (error) setError(error)
    if (data?.exercise) {
      setExercises((e) => {
        let result = e.filter((item) => item.id !== data.exercise.id)
        return result
      })      
      navigate("/exercise")
    }
    setIsFetching(false)
  }

  return {
    error,
    exercise,
    isFetching,
    deleteExercise
  }
}