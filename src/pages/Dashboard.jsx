import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [city, setCity] = useState("all");
  const [loading, setLoading] = useState(true); // 🆕 loading state
  const brokerId = localStorage.getItem("broker_id");
  const brokerName = localStorage.getItem("broker_name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (brokerId) {
      setLoading(true);
      api
        .get(`properties/?broker=${brokerId}`)
        .then((res) => {
          setProperties(res.data);
          setFiltered(res.data);
        })
        .catch(() => toast.error("Failed to load properties."))
        .finally(() => setLoading(false));
    }
  }, [brokerId]);

  // 🔍 Filtering Logic
  useEffect(() => {
    let result = properties;

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "all") {
      result = result.filter((p) => p.status === filter);
    }

    if (city !== "all") {
      result = result.filter(
        (p) => p.city && p.city.toLowerCase() === city.toLowerCase()
      );
    }

    setFiltered(result);
  }, [search, filter, city, properties]);

  const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))];

  if (!brokerId) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg">
          You are not logged in. Please{" "}
          <span
            className="underline cursor-pointer text-sky-600"
            onClick={() => navigate("/")}
          >
            login
          </span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4 sm:px-6 md:px-10">
      {/* 🌈 Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <motion.div
        className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] right-[-8rem] w-[25rem] h-[25rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <main className="space-y-10 max-w-7xl mx-auto">
        {/* 🧭 Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {brokerName || "Agent"}
            </span>{" "}
            👋
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Manage your listings, track insights, and stay ahead effortlessly.
          </p>
        </div>

        {/* 📊 Stats Section */}
        {loading ? (
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-4 mt-4 animate-pulse">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex-1 min-w-[110px] sm:min-w-[160px] bg-gray-100 rounded-2xl h-24"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-4 mt-4"
          >
            {[
              {
                label: "Total Properties",
                value: properties.length,
                color: "from-blue-500/90 to-blue-600/90",
              },
              {
                label: "Active",
                value: properties.filter((p) => p.status === "active").length,
                color: "from-green-500/90 to-emerald-600/90",
              },
              {
                label: "Disabled",
                value: properties.filter((p) => p.status === "disabled").length,
                color: "from-amber-500/90 to-orange-600/90",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 min-w-[110px] sm:min-w-[160px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-4 flex flex-col items-center text-center"
              >
                <div
                  className={`text-2xl sm:text-3xl font-semibold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm mt-1 font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Separator className="bg-gray-300/40" />

        {/* 🔍 Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 backdrop-blur-lg border border-white/40 shadow-sm p-5 rounded-2xl">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-9 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-[180px]">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="border-gray-300 focus:ring-blue-500">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            {["all", "active", "disabled"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? "default" : "outline"}
                className={`capitalize px-5 rounded-b-md text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:scale-[1.03]"
                    : "text-gray-700 border-gray-300 hover:text-blue-600 hover:border-blue-400"
                }`}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* 🏘 Property Grid */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Building2 size={20} className="text-blue-600" /> Your Listings
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-100 rounded-2xl shadow-sm"
                ></div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 mt-10 text-sm sm:text-base"
                >
                  No properties found. Try adjusting filters or add one.
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {filtered.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onUpdate={() => {
                        api
                          .get(`properties/?broker=${brokerId}`)
                          .then((res) => {
                            const sorted = res.data.sort((a, b) => {
                              if (a.status === "active" && b.status !== "active")
                                return -1;
                              if (a.status !== "active" && b.status === "active")
                                return 1;
                              return new Date(b.created_at) - new Date(a.created_at);
                            });
                            setProperties(sorted);
                            setFiltered(sorted);
                          });
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      </main>
    </div>
  );
}
