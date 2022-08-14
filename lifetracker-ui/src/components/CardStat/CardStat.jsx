import { formatStatistic, formatTimeStat } from "utils/format"
import "./CardStat.css"

export default function CardStat({ title, value, isDate }) {
  return (
    <div className="CardStat">
      <p>{title}</p>
      <span>{isDate ? formatTimeStat(value) : formatStatistic(value)}</span>
    </div>
  )
}