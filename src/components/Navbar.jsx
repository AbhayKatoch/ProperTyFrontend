import { Button } from "./ui/button";
import { Home, LogOut, KeyRound } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const brokerName = localStorage.getItem("broker_name");
  const isLoggedIn = !!localStorage.getItem("token");

  // Routes where navbar should be minimal
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Left: Logo */}
      <div
        onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <h1 className="text-xl font-bold text-sky-700 tracking-tight">
          PropertyTrackrr
        </h1>
      </div>

      {/* Right side */}
      {isAuthPage ? (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-sky-500 text-sky-600 hover:bg-sky-50"
            onClick={() => navigate("/")}
          >
            Login
          </Button>
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {brokerName && (
            <span className="text-gray-700 font-medium">
              {brokerName}
            </span>
          )}
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
