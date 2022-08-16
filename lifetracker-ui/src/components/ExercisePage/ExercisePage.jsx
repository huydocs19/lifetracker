import { Routes, Route } from "react-router-dom"
import { Banner, ExerciseDetail, ExerciseEdit, ExerciseNew, ExerciseOverview, NotFound } from "components"
import "./ExercisePage.css"

export default function ExercisePage() {
  return (
    <div className="ExercisePage">
      <Banner title="Exercise" />

      <div className="content">
        <Routes>
          <Route path="/" element={<ExerciseOverview />} />
          <Route path="/create" element={<ExerciseNew />} />
          <Route path="/:exerciseId" element={<ExerciseDetail />} />  
          <Route path="/:exerciseId/edit" element={<ExerciseEdit />} />        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}