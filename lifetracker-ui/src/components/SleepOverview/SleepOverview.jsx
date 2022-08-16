import { Link, useNavigate } from "react-router-dom"
import { Button, SleepCard } from "components"
import { useSleepContext } from "contexts/sleep"

import "./SleepOverview.css"

export default function SleepOverview() {
  const navigate = useNavigate()
  const { sleeps } = useSleepContext()

  return (
    <div className="SleepOverview">
      <div className="header">
        <h3>Overview</h3>
        <Button className="outline blue" onClick={() => navigate("/sleep/create")} size="small">
          {"Add Sleep"}
        </Button>
      </div>
      <div className="feed">
        {sleeps?.length ? (
          sleeps.map((sleep) => <Link to={`/sleep/${sleep.id}`} key={sleep.id} ><SleepCard sleep={sleep}/></Link>)
        ) : (
          <div className="empty">
            <h2>Nothing here yet.</h2>
          </div>
        )}
      </div>
    </div>
  )
}