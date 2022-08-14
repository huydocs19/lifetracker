import { createContext, useState, useContext, useEffect } from "react"
import { useAuthContext } from "contexts/auth"
import apiClient from "services/apiClient"

const ExerciseContext = createContext(null)

export const ExerciseContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const [initialized, setInitialized] = useState(false)
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchUserExercise = async () => {
      const { data } = await apiClient.fetchUserExercise()
      if (data?.exercises) setExercises(data.exercises)
      setInitialized(true)
    }

    if (user?.username) {
      fetchUserExercise()
    }
  }, [user])

  const exerciseValue = { exercises, setExercises, initialized }

  return (
    <ExerciseContext.Provider value={exerciseValue}>
      <>{children}</>
    </ExerciseContext.Provider>
  )
}

export const useExerciseContext = () => useContext(ExerciseContext)