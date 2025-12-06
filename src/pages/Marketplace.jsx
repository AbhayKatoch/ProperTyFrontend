// src/pages/Marketplace.jsx
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Lock,
  Search,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from "embla-carousel-react";


const API_BASE_URL = "https://key-mate-6w2f.onrender.com/api";
export default function Marketplace() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("all");
  const [bhk, setBhk] = useState("all");
  const [search, setSearch] = useState("");

  const handleUnlockClick = async (propertyId) => {
  try {
    const phone =
      localStorage.getItem("marketplace_phone") ||
      window.prompt("Enter your WhatsApp number (10 digits):");

    if (!phone) return;

    localStorage.setItem("marketplace_phone", phone);

    // 1) Check if already unlocked / credits
    const checkRes = await axios.get(
      `${API_BASE_URL}/payments/check-unlock/`,
      {
        params: { phone, property_id: propertyId },
      }
    );

    const { unlocked, credits } = checkRes.data;

    if (unlocked) {
      // fetch contact via unlock API (idempotent)
      const unlockRes = await axios.post(
        `${API_BASE_URL}/payments/unlock/`,
        { phone, property_id: propertyId }
      );
      // show unlockRes.data.contact + toast
      return;
    }

    if (credits < 1) {
      // open "buy credits" modal instead
      // or directly start Razorpay flow
      // e.g. openBuyCreditsModal(phone);
      return;
    }

    // 2) Try to unlock (deduct 1 credit)
    const unlockRes = await axios.post(
      `${API_BASE_URL}/payments/unlock/`,
      { phone, property_id: propertyId }
    );

    // unlockRes.data => { message, credits, contact }
    // Show contact phone + “WhatsApp now” CTA
  } catch (err) {
    console.error(err);
    // show toast error
  }
};


  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await axios.get(
          `https://key-mate-6w2f.onrender.com/api/public/properties/`,
          {
            params: {
              ordering: "-created_at",
            },
          }
        );
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  // extract cities from response
  const cities = Array.from(
    new Set(properties.map((p) => p.city).filter(Boolean))
  );

  const filtered = properties.filter((p) => {
    if (city !== "all" && p.city?.toLowerCase() !== city.toLowerCase())
      return false;
    if (bhk !== "all" && String(p.bhk) !== String(bhk)) return false;

    if (search.trim()) {
      const s = search.toLowerCase();
      const hay = `${p.title || ""} ${p.city || ""} ${
        p.locality || ""
      }`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl" />

      <main className="max-w-7xl mx-auto px-6 md:px-10 space-y-10">
        {/* Header */}
        <section className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-3">
                Public Marketplace
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Browse Rental & Sale Properties
              </h1>
              <p className="mt-2 text-gray-600 max-w-xl">
                Explore verified listings from brokers using{" "}
                <span className="font-semibold text-blue-700">
                  PropTrackkrr
                </span>
                . View limited details for free and unlock full access to
                connect with brokers.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm px-4 py-3 rounded-2xl">
              <Lock className="w-5 h-5 text-purple-600" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Broker contact locked</p>
                <p className="text-xs text-gray-500">
                  Pay once to unlock full details & connect directly.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      
        {/* Filters */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by title, city, locality..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* City & BHK */}
          <div className="flex gap-3 flex-wrap">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={bhk} onValueChange={setBhk}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any BHK</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Property grid */}
        <section className="pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              {loading
                ? "Loading listings..."
                : `${filtered.length} properties found`}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-sm"
              >
                Fetching properties...
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-sm"
              >
                No properties match your filters. Try changing the city / BHK.
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((p) => (
                <PropertyPublicCard
                  key={p.id}
                  property={p}
                  onUnlock={handleUnlockClick}
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

function PropertyPublicCard({ property, onUnlock }) {
  // ✅ Use Embla carousel over all media (same vibe as dashboard)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const hasMedia =
    Array.isArray(property.media) && property.media.length > 0;

  const priceLabel = property.price
    ? `₹ ${Number(property.price).toLocaleString()}`
    : "Price on request";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-md hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 relative">
          {/* 🖼 Carousel */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {hasMedia ? (
                property.media.map((m, idx) => (
                  <div key={idx} className="flex-[0_0_100%] relative">
                    <motion.img
                      src={m.storage_url}
                      alt={property.title || `Property ${idx + 1}`}
                      className="w-full h-48 object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                  <Home className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Carousel nav buttons */}
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

          {property.sale_or_rent && (
            <span className="absolute top-3 left-3 text-[11px] px-3 py-1 rounded-full bg-white/90 text-gray-800 font-medium shadow-sm">
              {property.sale_or_rent === "rent" ? "For Rent" : "For Sale"}
            </span>
          )}

          <span className="absolute top-3 right-3 text-[11px] px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold">
            Verified Broker
          </span>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {property.title || "Property"}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-blue-500" />
              <span className="truncate">
                {property.locality ? `${property.locality}, ` : ""}
                {property.city || ""}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-blue-700">{priceLabel}</span>
            {property.bhk && (
              <span className="text-gray-600">
                {property.bhk} BHK
                {property.area_sqft ? ` • ${property.area_sqft} sqft` : ""}
              </span>
            )}
          </div>

          {(property.description_beautified || property.description_raw) && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {property.description_beautified || property.description_raw}
            </p>
          )}

          {/* Locked contact section */}
          <div className="mt-2 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600">
                Broker details & WhatsApp contact are locked.
              </span>
            </div>

            <Button
            size="sm"
            className="w-full mt-1 bg-purple-600 hover:bg-purple-700 text-white text-sm"
            onClick={() => onUnlock(property.id)}
          >
            Unlock Contact & Full Details
          </Button>


          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
