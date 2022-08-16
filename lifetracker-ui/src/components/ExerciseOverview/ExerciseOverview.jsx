import { useNavigate, Link } from "react-router-dom"
import { Button, ExerciseCard } from "components"
import { useExerciseContext } from "contexts/exercise"

import "./ExerciseOverview.css"

export default function ExerciseOverview() {
  const navigate = useNavigate()
  const { exercises } = useExerciseContext()

  return (
    <div className="ExerciseOverview">
      <div className="header">
        <h3>Overview</h3>
        <Button className="outline gold" onClick={() => navigate("/exercise/create")} size="small">
          {"Add Exercise"}
        </Button>
      </div>
      <div className="feed">
        {exercises?.length ? (
          exercises.map((exercise) => <Link to={`/exercise/${exercise.id}`} key={exercise.id} ><ExerciseCard exercise={exercise}/></Link>)
        ) : (
          <div className="empty">
            <h2>Nothing here yet.</h2>
          </div>
        )}
      </div>
    </div>
  )
}