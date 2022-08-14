import { CardStat } from "components"
import { formatCalendar } from "utils/format"
import "./NutritionCard.css"

export default function NutritionCard({ nutrition }) {
  return (
    <div className="NutritionCard">
      <div className="card-header">
        {nutrition.imageUrl ? <img src={nutrition.imageUrl} alt="nutrition" /> : null}
        <h2 className="title">{nutrition.name}</h2>
      </div>

      <div className="card-stats">
        <CardStat title="Calories" value={nutrition.calories} />
        <CardStat title="Quantity" value={nutrition.quantity} />
      </div>

      <div className="card-meta">
        <small>{formatCalendar(nutrition.createdAt)}</small>
        <small className="category">{nutrition.category}</small>
      </div>
    </div>
  )
}
