"use client";

import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";

function PublicPropertyCard({ property }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const hasMedia = Array.isArray(property.media) && property.media.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="rounded-2xl p-0 border border-white/50 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* === Image Carousel (same style as dashboard) === */}
        <CardHeader className="p-0 relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {hasMedia ? (
                property.media.map((m, idx) => (
                  <div key={idx} className="flex-[0_0_100%] relative">
                    <motion.img
                      src={m.storage_url}
                      alt={`Property ${idx + 1}`}
                      className="w-full h-52 object-cover rounded-t-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                ))
              ) : (
                <div className="flex-[0_0_100%] h-52 flex items-center justify-center bg-gray-100 rounded-t-2xl">
                  <Home className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Carousel Controls (if multiple images) */}
          {hasMedia && property.media.length > 1 && (
            <>
              <Button
                size="icon"
                variant="secondary"
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Status / Tag */}
          {property.sale_or_rent && (
            <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold bg-white/90 text-gray-800 shadow-sm">
              {property.sale_or_rent.toUpperCase()}
            </span>
          )}
        </CardHeader>

        {/* === Content === */}
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {property.title || "Property"}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1 mt-1">
              <MapPin size={14} className="text-blue-600" />
              {property.locality || "Location"}{" "}
              {property.city ? `• ${property.city}` : ""}
            </div>
          </div>

          {property.price && (
            <div className="text-xl font-bold text-blue-700">
              ₹ {Number(property.price).toLocaleString()}
              {property.sale_or_rent === "rent" && (
                <span className="text-xs text-gray-500 font-normal ml-1">
                  /month
                </span>
              )}
            </div>
          )}

          {(property.bhk || property.area_sqft) && (
            <p className="text-sm text-gray-600">
              {property.bhk && (
                <span className="font-medium text-gray-800">
                  {property.bhk} BHK
                </span>
              )}
              {property.bhk && property.area_sqft && " • "}
              {property.area_sqft && `${property.area_sqft} sqft`}
            </p>
          )}

          {/* Restricted info hint */}
          <div className="mt-2 p-2 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center gap-2">
            <Lock size={14} className="text-blue-500 shrink-0" />
            <p className="text-xs text-gray-600">
              Contact details are locked. Soon you’ll be able to unlock and
              connect with the broker.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Marketplace() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [bhk, setBhk] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/public/properties/`, {
        params: { ordering: "-created_at" },
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data.results || [];
        setProperties(list);
        setFiltered(list);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load marketplace properties.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filters
  useEffect(() => {
    let result = [...properties];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.city && p.city.toLowerCase().includes(q)) ||
          (p.locality && p.locality.toLowerCase().includes(q))
      );
    }

    if (city !== "all") {
      result = result.filter(
        (p) => p.city && p.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (bhk !== "all") {
      result = result.filter((p) => String(p.bhk || "") === String(bhk));
    }

    setFiltered(result);
  }, [search, city, bhk, properties]);

  const cities = [
    ...new Set(properties.map((p) => p.city).filter((c) => !!c)),
  ];

  const bhkOptions = [
    ...new Set(
      properties
        .map((p) => p.bhk)
        .filter((b) => b !== null && b !== undefined && b !== "")
    ),
  ].sort((a, b) => Number(a) - Number(b));

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4 sm:px-6 md:px-10">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <motion.div
        className="absolute -top-32 -left-32 w-[26rem] h-[26rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] right-[-8rem] w-[24rem] h-[24rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Verified Properties
            </span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Browse live listings uploaded by brokers. View limited details now —
            unlock full access soon.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-1 min-w-[180px]">
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <Input
                placeholder="Search by title, city or locality..."
                className="pl-9 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="w-[140px]">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="border-gray-200">
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

              <div className="w-[120px]">
                <Select value={bhk} onValueChange={setBhk}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="BHK" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any BHK</SelectItem>
                    {bhkOptions.map((b) => (
                      <SelectItem key={b} value={String(b)}>
                        {b} BHK
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-300/40" />

        {/* Grid */}
        <section>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-56 bg-gray-100 rounded-2xl shadow-sm"
                  />
                ))}
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 mt-10 text-sm sm:text-base"
              >
                No properties found. Try adjusting filters.
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
                  <PublicPropertyCard key={p.id} property={p} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
