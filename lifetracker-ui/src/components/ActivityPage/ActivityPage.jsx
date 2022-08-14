import { useNavigate } from "react-router-dom"
import { useActivityContext, selectMainSummaryStats, selectExtraSummaryStats } from "contexts/activity"
import { Button, SummaryStat } from "components"
import "./ActivityPage.css"

const Actions = ({ title = "Activity Feed" }) => {
  const navigate = useNavigate()
  return (
    <div className="actions">
      <h2 className="heading">{title}</h2>

      <div className="buttons">
        <Button className="outline gold" onClick={() => navigate("/exercise/create")} size="small">
          {"Add Exercise"}
        </Button>
        <Button className="outline blue" onClick={() => navigate("/sleep/create")} size="small">
          {"Log Sleep"}
        </Button>
        <Button className="outline aqua" onClick={() => navigate("/nutrition/create")} size="small">
          {"Record Nutrition"}
        </Button>
      </div>
    </div>
  )
}

export default function ActivityPage() {
  const { activity } = useActivityContext()
  const mainSummaryStats = selectMainSummaryStats(activity)
  const extraSummaryStats = selectExtraSummaryStats(activity)

  return (
    <div className="ActivityPage">
      <div className="content">
        <Actions />

        <div className="stats">
          <div className="main">
            <SummaryStat
              color="gold"
              isAverage={false}
              stat={{ title: `Total Exercise Minutes`, value: mainSummaryStats.totalExerciseMinutes }}
            />
            <SummaryStat
              color="purple"
              isAverage={true}
              stat={{ title: `Avg Sleep Hours`, value: mainSummaryStats.averageSleepHours }}
            />
            <SummaryStat
              color="aqua"
              isAverage={true}
              stat={{ title: `Avg Daily Calories`, value: mainSummaryStats.averageDailyCalories }}
            />
          </div>
          <h4>More Stats</h4>
          <div className="more">
            <SummaryStat
              stat={{ title: `Maximum Daily Calories`, value: extraSummaryStats.maxCaloriesInOneMeal }}
              isAverage={false}
              color="teal"
              size="small"
            />
            <SummaryStat
              stat={{ title: `Avg Exercise Intensity`, value: extraSummaryStats.averageExerciseIntensity }}
              isAverage={true}
              color="orange"
              size="small"
            />
            <SummaryStat
              stat={{ title: `Total Hours Slept`, value: extraSummaryStats.totalSleepHours }}
              isAverage={false}
              color="red"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  )
}