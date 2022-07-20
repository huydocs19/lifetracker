import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";

import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activity" element={<ProtectedRoute element={<ActivityPage />} />} />
          <Route path="/exercise/*" element={<ProtectedRoute element={<ExercisePage />} />} />
          <Route path="/nutrition/*" element={<ProtectedRoute element={<NutritionPage />} />} />
          <Route path="/sleep/*" element={<ProtectedRoute element={<SleepPage />} />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

