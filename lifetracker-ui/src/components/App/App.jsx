import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  
  ActivityPage,
  Landing,
  Login,
  Navbar,
  NotFound,
  Register, 
  ProtectedRoute
} from "components"
import { AuthContextProvider } from "contexts/auth"
import "./App.css"

export default function AppContainer() {
  return (
    <AuthContextProvider>      
      <App />           
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
          <Route path="*" element={<NotFound />} />    
        </Routes>
      </BrowserRouter>
    </div>
  )
}

