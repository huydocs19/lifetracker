import { Routes, Route } from "react-router-dom"
import { Banner, SleepDetail, SleepEdit, SleepNew, SleepOverview, NotFound } from "components"
import "./SleepPage.css"

export default function SleepPage() {
  return (
    <div className="SleepPage">
      <Banner title="Sleep" />

      <div className="content">
        <Routes>
          <Route path="/" element={<SleepOverview />} />
          <Route path="/create" element={<SleepNew />} />
          <Route path="/:sleepId" element={<SleepDetail />} />  
          <Route path="/:sleepId/edit" element={<SleepEdit />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}