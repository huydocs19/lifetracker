import { createContext, useState, useContext, useEffect } from "react"
import { useAuthContext } from "contexts/auth"
import apiClient from "services/apiClient"

const SleepContext = createContext(null)

export const SleepContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const [initialized, setInitialized] = useState(false)
  const [sleeps, setSleeps] = useState([])

  useEffect(() => {
    const fetchUserSleep = async () => {
      const { data } = await apiClient.fetchUserSleep()
      if (data?.sleep) setSleeps(data.sleep)
      setInitialized(true)
    }

    if (user?.username) {
      fetchUserSleep()
    }
  }, [user])

  const sleepValue = { sleeps, setSleeps, initialized }

  return (
    <SleepContext.Provider value={sleepValue}>
      <>{children}</>
    </SleepContext.Provider>
  )
}

export const useSleepContext = () => useContext(SleepContext)