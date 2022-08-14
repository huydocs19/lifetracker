import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  
  ActivityPage,
  ExercisePage,
  Landing,
  Login,
  Navbar,
  NotFound,
  NutritionPage,   
  ProtectedRoute,
  Register,
  SleepPage,
} from "components"
import { AuthContextProvider } from "contexts/auth"
import { ExerciseContextProvider } from "contexts/exercise"
import { NutritionContextProvider } from "contexts/nutrition"
import { SleepContextProvider } from "contexts/sleep"
import "./App.css"

export default function AppContainer() {
  return (
    <AuthContextProvider>      
      <ExerciseContextProvider>
        <NutritionContextProvider> 
          <SleepContextProvider>
            <App /> 
          </SleepContextProvider>          
        </NutritionContextProvider>        
      </ExerciseContextProvider>
                
    </AuthContextProvider>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/activity" element={<ProtectedRoute element={<ActivityPage />} />} /> 
          <Route path="/exercise/*" element={<ProtectedRoute element={<ExercisePage />} />} />
          <Route path="/nutrition/*" element={<ProtectedRoute element={<NutritionPage />} />} />
          <Route path="/sleep/*" element={<ProtectedRoute element={<SleepPage />} />} />
          <Route path="*" element={<NotFound />} />    
        </Routes>
      </BrowserRouter>
    </div>
  )
}

