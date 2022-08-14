import { formatStatistic, formatAverage } from "utils/format"
import "./SummaryStat.css"

export default function SummaryStat({ stat, isAverage = true, color = "orange", size = "large" }) {
  return (
    <div className={`SummaryStat ${size} ${color}`}>
      <div className="background">
        <p>{stat.title}</p>
        <h1>{isAverage ? formatAverage(stat.value) : formatStatistic(stat.value)}</h1>
        <svg
          height="100%"
          width="100%"
          viewBox={`0 0 220 360`}
          style={{
            position: "absolute",
            left: -122,
            bottom: -122,
            right: 0,
            transform: `rotate(180deg)`,
            transformOrigin: `center center`,
          }}
        >
          <path fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.15)" />
        </svg>
      </div>
    </div>
  )
}