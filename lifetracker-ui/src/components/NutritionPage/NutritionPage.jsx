import { Routes, Route } from "react-router-dom"
import { Banner, NutritionDetail, NutritionEdit, NutritionNew, NutritionOverview, NotFound } from "components"
import "./NutritionPage.css"

export default function NutritionPage() {
  return (
    <div className="NutritionPage">
      <Banner title="Nutrition" />

      <div className="content">
        <Routes>
          <Route path="/" element={<NutritionOverview />} />
          <Route path="/create" element={<NutritionNew />} />
          <Route path="/:nutritionId" element={<NutritionDetail />} />  
          <Route path="/:nutritionId/edit" element={<NutritionEdit />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
