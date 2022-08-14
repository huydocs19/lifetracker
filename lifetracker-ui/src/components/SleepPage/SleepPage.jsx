import { Routes, Route } from "react-router-dom"
import { Banner, SleepNew, SleepOverview, NotFound } from "components"
import "./SleepPage.css"

export default function SleepPage() {
  return (
    <div className="SleepPage">
      <Banner title="Sleep" />

      <div className="content">
        <Routes>
          <Route path="/" element={<SleepOverview />} />
          <Route path="/create" element={<SleepNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}