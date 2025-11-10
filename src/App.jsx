import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PropertyDetail from "./pages/PropertyDetail";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/Layout";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import { motion, AnimatePresence } from "framer-motion";

// 🪄 React Hot Toast
import { Toaster, toast } from "react-hot-toast";
import Hostcare from "./pages/Hostcase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Optional: Property detail route */}
          {/* <Route path="/property/:id" element={<PropertyDetail />} /> */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>
            <Route path="/hostcare" element={<Hostcare />} />
      </Routes>

      {/* 🌈 Global Toast Component */}
              <Toaster position="top-right" reverseOrder={false}>
  {(t) => (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex items-center gap-3 px-5 py-3 rounded-xl 
                     bg-white/70 backdrop-blur-xl border border-gray-200/60
                     shadow-md text-gray-800 w-[320px]"
        >
          {/* Accent Bar */}
          <motion.div
            layoutId="toast-accent"
            className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-l-xl ${
              t.type === 'success'
                ? 'bg-gradient-to-b from-blue-500 to-green-500'
                : 'bg-gradient-to-b from-red-500 to-pink-500'
            }`}
          />

          {/* Icon */}
          <div
            className={`p-2 rounded-full ${
              t.type === 'success'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {t.type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Text */}
          <div>
            <p className="font-semibold text-sm">
              {t.message?.includes("deleted")
                ? "Property Deleted"
                : t.message?.includes("disabled")
                ? "Property Disabled"
                : t.type === "success"
                ? "Success"
                : "Error"}
            </p>
            <p className="text-xs text-gray-600">{t.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )}
</Toaster>

    </BrowserRouter>
  );
}

export default App;
