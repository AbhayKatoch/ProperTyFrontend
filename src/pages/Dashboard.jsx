import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LogOut, Search, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Navbar from "../components/Navbar";
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
  const brokerId = localStorage.getItem("broker_id");
  const brokerName = localStorage.getItem("broker_name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (brokerId) {
      api
        .get(`properties/?broker=${brokerId}`)
        .then((res) => {
          setProperties(res.data);
          setFiltered(res.data);
        })
        .catch(() => toast.error("Failed to load properties."));
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
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌈 Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-indigo-100" />

      {/* ✅ Navbar */}
      <Navbar />

      <main className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              label: "Total Properties",
              value: properties.length,
              color: "text-sky-600",
            },
            {
              label: "Active",
              value: properties.filter((p) => p.status === "active").length,
              color: "text-green-600",
            },
            {
              label: "Disabled",
              value: properties.filter((p) => p.status === "disabled").length,
              color: "text-amber-600",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/60 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-500 text-sm">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={`text-3xl font-semibold ${stat.color}`}
                >
                  {stat.value}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Separator />

        {/* 🔍 Search + Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-4 rounded-xl">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-9 border-gray-300 focus:ring-sky-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* City Filter */}
          <div className="w-[180px]">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="border-gray-300">
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

          {/* Status Buttons */}
          <div className="flex gap-2">
            {["all", "active", "disabled"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? "default" : "outline"}
                className={`capitalize ${
                  filter === f
                    ? "bg-sky-600 text-white hover:bg-sky-700 shadow-md"
                    : "text-gray-700 border-gray-300 hover:text-sky-600 hover:border-sky-400"
                }`}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* 🏘 Property Grid */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-sky-600" /> Your Listings
          </h2>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 mt-10"
              >
                No properties found. Try adjusting filters or add one.
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {filtered.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    onUpdate={() => {
                      api
                        .get(`properties/?broker=${brokerId}`)
                        .then((res) => {
  // ✅ Sort: active first, then by creation date (latest first)
                            const sorted = res.data.sort((a, b) => {
                              // 1️⃣ Active properties come first
                              if (a.status === "active" && b.status !== "active") return -1;
                              if (a.status !== "active" && b.status === "active") return 1;

                              // 2️⃣ Then sort by created_at (descending)
                              const aDate = new Date(a.created_at);
                              const bDate = new Date(b.created_at);
                              return bDate - aDate;
                            });

                            setProperties(sorted);
                            setFiltered(sorted);
                          })

                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
