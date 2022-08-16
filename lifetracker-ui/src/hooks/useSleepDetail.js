import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useSleepContext } from "contexts/sleep"
import { useAuthContext, selectIsUserAuthenticated } from "contexts/auth"
import apiClient from "services/apiClient"

export const useSleepDetail = (sleepId) => {
  const { setSleeps } = useSleepContext()
  const { user, initialized } = useAuthContext()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [sleep, setSleep] = useState({})
  const navigate = useNavigate()

  const isAuthenticated = selectIsUserAuthenticated(user, initialized)

  useEffect(() => {
    const fetchSleep = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.fetchSleepById(sleepId)
      if (error) setError(error)
      if (data?.sleep) {
        setSleep(data.sleep)
      }

      setIsFetching(false)
    }

    if (isAuthenticated) {
      fetchSleep()
    }
  }, [sleepId, isAuthenticated])

  const deleteSleep = async () => {
    setIsFetching(true)

    const { data, error } = await apiClient.deleteSleep(sleepId)
    if (error) setError(error)
    if (data?.sleep) {
      setSleeps((s) => {
        let result = s.filter((item) => item.id !== data.sleep.id)
        return result
      })      
      navigate("/sleep")
    }
    setIsFetching(false)
  }

  return {
    error,
    sleep,
    isFetching,
    deleteSleep
  }
}