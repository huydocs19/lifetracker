import { CardStat } from "components"
import { formatDate } from "utils/format"
import { calculateHoursDifference } from "utils/calculations"
import "./SleepCard.css"

export default function SleepCard({ sleep }) {
  return (
    <div className="SleepCard">
      <div className="card-header">
        <h2 className="title">{formatDate(sleep.startTime)}</h2>
      </div>

      <div className="card-stats">
        <CardStat title="Start Time" value={sleep.startTime} isDate />
        <CardStat title="End Time" value={sleep.endTime} isDate />
      </div>

      <div className="card-meta">
        <small>{calculateHoursDifference(sleep.startTime, sleep.endTime)} hours</small>
      </div>
    </div>
  )
}