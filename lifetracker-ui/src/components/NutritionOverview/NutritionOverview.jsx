import { Link, useNavigate } from "react-router-dom"
import { Button, NutritionCard } from "components"
import { useNutritionContext } from "contexts/nutrition"

import "./NutritionOverview.css"

export default function NutritionOverview() {
  const navigate = useNavigate()
  const { nutritions } = useNutritionContext()

  return (
    <div className="NutritionOverview">
      <div className="header">
        <h3>Overview</h3>
        <Button className="outline aqua" onClick={() => navigate("/nutrition/create")} size="small">
          {"Record Nutrition"}
        </Button>
      </div>
      <div className="feed">
        {nutritions?.length ? (
          nutritions.map((nutrition) => <Link to={`/nutrition/${nutrition.id}`} key={nutrition.id} ><NutritionCard nutrition={nutrition} /></Link>)
        ) : (
          <div className="empty">
            <h2>Nothing here yet.</h2>
          </div>
        )}
      </div>
    </div>
  )
}
