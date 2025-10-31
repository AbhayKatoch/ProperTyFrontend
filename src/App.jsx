import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import PropertyDetail from './pages/PropertyDetail'
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import PrivacyPolicy from './pages/PrivacyPolicy'
import Home from "./pages/Home"
import About from "./pages/About"
import Layout from "./components/Layout"
import HowItWorks from "./pages/HowItWorks"
import Contact from "./pages/Contact"
import Features from "./pages/Features"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          {/* <Route path="/property/:id" element={<PropertyDetail />} /> ✅ detail route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
