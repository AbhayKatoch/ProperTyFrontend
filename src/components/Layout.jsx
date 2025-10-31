import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();

  // Automatically scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide footer on dashboard-like routes
  const hideFooter = location.pathname.startsWith("/dashboard") | location.pathname.startsWith("/login") | location.pathname.startsWith("/register");
  

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -25 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30">
      {/* Persistent Navbar */}
      <Navbar />
        <div className="h-2 md:h-4"></div>
      {/* Animated Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname} // ✅ Required for route change animation
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duratiaon: 0.45,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="flex-grow "
        >
          <Outlet /> {/* This renders the child route (e.g., About, Home, etc.) */}
        </motion.main>
      </AnimatePresence>

      {/* Footer (hidden on dashboard) */}
      {!hideFooter && <Footer />}
    </div>
  );
}
