import { useAuthContext } from "contexts/auth"

export default function ActivityPage() {
  const {user} = useAuthContext()  
  return (
    <div className="ActivityPage">
      <div className="content">
        <h1>Hello, {user?.username}</h1>
      </div>
    </div>
  )
}