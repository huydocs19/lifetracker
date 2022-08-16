import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "services/apiClient"
import { useExerciseContext } from "contexts/exercise"
import {useExerciseDetail} from "hooks/useExerciseDetail"

export const useExerciseEditForm = (exerciseId) => {
  const { setExercises } = useExerciseContext()
  const navigate = useNavigate()  
  const {exercise} = useExerciseDetail(exerciseId)    
  const [isLoading, setIsLoading] = useState(false)  
  const [form, setForm] = useState({
    name: "",
    duration: 1,
    intensity: 1,
    category: "",    
  })  
  const [errors, setErrors] = useState({})  

  useEffect(() => {    
    setForm({
      name: exercise.name || "",
      duration: exercise.duration || 1,
      intensity: exercise.intensity || 1,
      category: exercise.category || "",    
    })
  }, [exercise])
  const handleOnSubmit = async () => {
    setIsLoading(true)

    const { data, error } = await apiClient.updateExercise(exercise.id, form)
    if (error) setErrors((e) => ({ ...e, form: error }))

    if (data?.exercise) {
      setExercises((e) => {
        let result = []
        e.forEach((item) => {
          if (item.id === data.exercise.id) {
            result.push(data.exercise)
          } else {
            result.push(item)
          }
        })
        return result
      })
      setIsLoading(false)
      navigate(`/exercise/${exercise.id}`)
    } else {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return {
    form,    
    exercise,
    errors,
    isLoading,
    handleOnSubmit,
    handleOnChange,
  }
}