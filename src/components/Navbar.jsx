import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Home, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const brokerName = localStorage.getItem("broker_name");
  const isLoggedIn = !!localStorage.getItem("token");

  const loggedOutLinks = [
    { label: "Features", path: "/features" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Contact", path: "/contact" }
  ];

  const loggedInLinks = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Marketplace", path: "/marketplace" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linksToShow = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full fixed top-0 z-50 backdrop-blur-md transition-all duration-500 border-b",
        scrolled ? "bg-white/90 border-gray-200 shadow-sm" : "bg-white/40 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4">
        <div
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
            <Home className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PropTrackrr
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {linksToShow.map((link) => (
            <motion.button
              key={link.path}
              onClick={() => navigate(link.path)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={cn(
                "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              )}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {!isLoggedIn ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 font-medium"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm hover:shadow-md transition-all"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              {brokerName && (
                <span className="hidden sm:inline text-gray-700 font-medium whitespace-nowrap">
                  👋 {brokerName}
                </span>
              )}

              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-blue-50 transition"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="hidden sm:flex items-center gap-2 shadow-sm hover:shadow-md transition"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </Button>

              <div className="flex sm:hidden gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-blue-50"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="text-white"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-sm px-6 py-4 flex flex-col space-y-3"
          >
            {linksToShow.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 text-base font-medium hover:text-blue-600 transition"
              >
                {link.label}
              </button>
            ))}
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-700 text-base font-medium hover:text-blue-600 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-red-600 text-base font-medium hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-700 text-base font-medium hover:text-blue-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-700 text-base font-medium hover:text-blue-600 transition"
                >
                  Register
                </button>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
