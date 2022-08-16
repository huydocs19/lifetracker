import { createContext, useState, useContext, useEffect } from "react"
import { useAuthContext } from "contexts/auth"
import { useSleepContext } from "contexts/sleep"
import { useExerciseContext } from "contexts/exercise"
import { useNutritionContext } from "contexts/nutrition"
import apiClient from "services/apiClient"

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const { exercises, initialized: exerciseInitialized } = useExerciseContext()
  const { nutritions, initialized: nutritionInitialized } = useNutritionContext()
  const { sleeps, initialized: sleepInitialized } = useSleepContext()  
  const [activity, setActivity] = useState({
    averageExerciseIntensity: 0,
    averageDailyCalories: 0,
    maxCaloriesInOneMeal: 0,
    averageSleepHours: 0,
    totalSleepHours: 0,
    totalExerciseMinutes: 0,
  })
  
  const allInitialized = [exerciseInitialized, nutritionInitialized, sleepInitialized].every((v) => Boolean(v))

  useEffect(() => {
    const fetchUserActivity = async () => {
      const { data } = await apiClient.fetchUserActivity()     
      if (data) {
        setActivity((s) => ({
          ...s,          
          totalExerciseMinutes: data.exerciseSummaryStats?.totalExerciseMinutes || 0,
          averageExerciseIntensity: data.exerciseSummaryStats?.avgExerciseIntensity || 0,
          averageDailyCalories: data.nutritionSummaryStats?.avgDailyCalories || 0,
          maxCaloriesInOneMeal: data.nutritionSummaryStats?.maxCalories || 0,
          averageSleepHours: data.sleepSummaryStats?.avgSleepHours,
          totalSleepHours: data.sleepSummaryStats?.totalSleepHours       
        }))
      }      
    }

    if (user?.username) {
      if (allInitialized) {
        fetchUserActivity()        
      } 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username, allInitialized, exercises, nutritions, sleeps])

  const activityValue = { activity, setActivity }

  return (
    <ActivityContext.Provider value={activityValue}>
      <>{children}</>
    </ActivityContext.Provider>
  )
}

export const useActivityContext = () => useContext(ActivityContext)

export const selectMainSummaryStats = (activity) => ({
  totalExerciseMinutes: activity.totalExerciseMinutes,
  averageSleepHours: activity.averageSleepHours,
  averageDailyCalories: activity.averageDailyCalories,
})
export const selectExtraSummaryStats = (activity) => ({
  maxCaloriesInOneMeal: activity.maxCaloriesInOneMeal,
  averageExerciseIntensity: activity.averageExerciseIntensity,
  totalSleepHours: activity.totalSleepHours,
})