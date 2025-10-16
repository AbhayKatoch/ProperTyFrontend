import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import PropertyDetail from './pages/PropertyDetail'
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* <Route path="/property/:id" element={<PropertyDetail />} /> ✅ detail route */}
        <Route path="/privacy" element={<PrivacyPolicy />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
