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
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://key-mate-6w2f.onrender.com/api";

export default function Marketplace() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("all");
  const [bhk, setBhk] = useState("all");
  const [search, setSearch] = useState("");

  const [phone, setPhone] = useState("");
  const [credits, setCredits] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);

  const [unlockedMap, setUnlockedMap] = useState({});
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(199);

  const ensurePhone = async () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    const storedPhone = localStorage.getItem("marketplace_phone") || phone || "";

    if (!token) {
      toast.error("Please login to continue.");
      window.location.href = `/login?redirect=/marketplace`;
      return null;
    }

    if (!storedPhone) {
      toast.error("Please complete your profile with a phone number.");
      window.location.href = "/profile";
      return null;
    }

    if (!/^\d{10}$/.test(storedPhone)) {
      toast.error("Your profile phone number looks invalid. Please update it.");
      window.location.href = "/profile";
      return null;
    }

    setPhone(storedPhone);
    return storedPhone;
  };

  const fetchWallet = async (phoneNumber) => {
    if (!phoneNumber) return;
    try {
      setWalletLoading(true);
      const res = await axios.get(`${API_BASE_URL}/wallet/`, {
        params: { phone: phoneNumber },
      });
      setCredits(res.data.credits);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    } finally {
      setWalletLoading(false);
    }
  };

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/public/properties/`, {
          params: { ordering: "-created_at" },
        });
        setProperties(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPhone = localStorage.getItem("marketplace_phone");
    const token = localStorage.getItem("token");
    if (storedPhone) {
      setPhone(storedPhone);
      fetchWallet(storedPhone);
    } else if (token) {
      setPhone("");
    }
  }, []);

  const handleUnlockClick = async (propertyId) => {
    try {
      const phoneNumber = await ensurePhone();
      if (!phoneNumber) return;

      const checkRes = await axios.get(`${API_BASE_URL}/payments/check-unlock/`, {
        params: { phone: phoneNumber, property_id: propertyId },
      });

      const { unlocked, credits: currentCredits } = checkRes.data || {};
      if (credits === null && typeof currentCredits === "number") {
        setCredits(currentCredits);
      }

      const showContactUI = (contact) => {
        if (!contact) {
          toast.error("Unlocked, but no broker contact found. Please contact support.");
          return;
        }
        setUnlockedMap((prev) => ({ ...prev, [propertyId]: contact }));
        toast.success(
          [
            "Contact unlocked ✅",
            contact.name ? `Name: ${contact.name}` : null,
            contact.phone ? `Phone: ${contact.phone}` : null,
          ]
            .filter(Boolean)
            .join(" · ")
        );
      };

      if (unlocked) {
        const unlockRes = await axios.post(`${API_BASE_URL}/payments/unlock/`, {
          phone: phoneNumber,
          property_id: propertyId,
        });
        const { contact, credits: newCredits } = unlockRes.data;
        if (typeof newCredits === "number") setCredits(newCredits);
        showContactUI(contact);
        return;
      }

      if (!unlocked && (currentCredits === 0 || currentCredits < 1)) {
        toast("You don’t have enough credits to unlock this property.");
        setIsBuyModalOpen(true);
        return;
      }

      const unlockRes = await axios.post(`${API_BASE_URL}/payments/unlock/`, {
        phone: phoneNumber,
        property_id: propertyId,
      });

      const { contact, credits: newCredits } = unlockRes.data;
      if (typeof newCredits === "number") setCredits(newCredits);
      showContactUI(contact);
    } catch (err) {
      console.error("Error unlocking property:", err);
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || err.response?.data?.detail || "Something went wrong. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleBuyCredits = async () => {
    try {
      const phoneNumber = await ensurePhone();
      if (!phoneNumber) return;

      const amount = selectedPack;

      const orderRes = await axios.post(`${API_BASE_URL}/payments/create-order/`, {
        phone: phoneNumber,
        amount,
      });

      const { order_id, amount_paise, key } = orderRes.data;

      if (typeof window === "undefined" || !window.Razorpay) {
        toast.error("Razorpay is not available. Please refresh and try again.");
        return;
      }

      const options = {
        key,
        amount: amount_paise,
        currency: "INR",
        name: "PropTrackkrr",
        description: "Buy credits",
        order_id,
        prefill: { contact: phoneNumber },
        notes: { phone: phoneNumber },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${API_BASE_URL}/payments/verify/`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const { credits: newCredits, credits_added } = verifyRes.data;
            if (typeof newCredits === "number") setCredits(newCredits);

            toast.success(`Payment successful! ${credits_added} credits added to your wallet.`);
            setIsBuyModalOpen(false);
          } catch (e) {
            console.error("Error verifying payment:", e);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || err.response?.data?.detail || "Could not start payment. Please try again.";
        toast.error(msg);
      } else {
        toast.error("Could not start payment. Please try again.");
      }
    }
  };

  const cities = Array.from(new Set(properties.map((p) => p.city).filter(Boolean)));

  const filtered = properties.filter((p) => {
    if (city !== "all" && p.city?.toLowerCase() !== city.toLowerCase()) return false;
    if (bhk !== "all" && String(p.bhk) !== String(bhk)) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      const hay = `${p.title || ""} ${p.city || ""} ${p.locality || ""}`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl" />

      <main className="max-w-7xl mx-auto px-6 md:px-10 space-y-10">
        <section className="pt-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-3">Public Marketplace</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Browse Rental &amp; Sale Properties</h1>
              <p className="mt-2 text-gray-600 max-w-xl">Explore verified listings from brokers using <span className="font-semibold text-blue-700">PropTrackkrr</span>. View limited details for free and unlock full access to connect with brokers.</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm px-4 py-3 rounded-2xl">
                <Lock className="w-5 h-5 text-purple-600" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold">Broker contact locked</p>
                  <p className="text-xs text-gray-500">Use credits to unlock details &amp; connect directly.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-white/70 shadow-sm">Phone: {phone || "Not set"}</span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 shadow-sm">{walletLoading ? "Credits: loading..." : `Credits: ${credits ?? 0}`}</span>
                <Button size="xs" className="px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs" onClick={() => setIsBuyModalOpen(true)}>Buy Credits</Button>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <Input placeholder="Search by title, city, locality..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
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

        <section className="pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">{loading ? "Loading listings..." : `${filtered.length} properties found`}</h2>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-sm">Fetching properties...</motion.div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-sm">No properties match your filters. Try changing the city / BHK.</motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <PropertyPublicCard key={p.id} property={p} onUnlock={handleUnlockClick} unlockedContact={unlockedMap[p.id]} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {isBuyModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="w-full max-w-md">
            <Card className="rounded-2xl shadow-xl border border-white/70 bg-white/95">
              <CardHeader className="border-b border-gray-100 px-5 py-4">
                <h3 className="font-semibold text-gray-900">Buy Credits</h3>
                <p className="text-xs text-gray-500 mt-1">Use credits to unlock broker contact details and WhatsApp numbers for properties.</p>
              </CardHeader>
              <CardContent className="px-5 py-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Choose a credit pack</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[99, 199, 399].map((amt) => (
                      <button key={amt} type="button" onClick={() => setSelectedPack(amt)} className={`flex flex-col items-center justify-center rounded-xl border px-3 py-2 text-xs font-medium transition ${selectedPack === amt ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300"}`}>
                        <span>₹{amt}</span>
                        <span className="text-[10px] text-gray-500">~ {Math.floor(amt / 10)} credits</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Phone: <span className="font-semibold">{phone || "Not set"}</span></span>
                  <span>Current credits: <span className="font-semibold">{credits ?? 0}</span></span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 mt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsBuyModalOpen(false)}>Cancel</Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleBuyCredits}>Pay ₹{selectedPack} securely</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function PropertyPublicCard({ property, onUnlock, unlockedContact }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const hasMedia = Array.isArray(property.media) && property.media.length > 0;

  const priceLabel = property.price ? `₹ ${Number(property.price).toLocaleString()}` : "Price on request";

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-md hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {hasMedia ? (
                property.media.map((m, idx) => (
                  <div key={idx} className="flex-[0_0_100%] relative">
                    <motion.img src={m.storage_url} alt={property.title || `Property ${idx + 1}`} className="w-full h-48 object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />
                  </div>
                ))
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                  <Home className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {hasMedia && property.media.length > 1 && (
            <>
              <Button size="icon" variant="secondary" onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full"><ChevronLeft className="w-4 h-4" /></Button>
              <Button size="icon" variant="secondary" onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm rounded-full"><ChevronRight className="w-4 h-4" /></Button>
            </>
          )}

          {property.sale_or_rent && <span className="absolute top-3 left-3 text-[11px] px-3 py-1 rounded-full bg-white/90 text-gray-800 font-medium shadow-sm">{property.sale_or_rent === "rent" ? "For Rent" : "For Sale"}</span>}

          <span className="absolute top-3 right-3 text-[11px] px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold">Verified Broker</span>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{property.title || "Property"}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-blue-500" />
              <span className="truncate">{property.locality ? `${property.locality}, ` : ""}{property.city || ""}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-blue-700">{priceLabel}</span>
            {property.bhk && <span className="text-gray-600">{property.bhk} BHK{property.area_sqft ? ` • ${property.area_sqft} sqft` : ""}</span>}
          </div>

          {(property.description_beautified || property.description_raw) && <p className="text-xs text-gray-600 line-clamp-2">{property.description_beautified || property.description_raw}</p>}

          <div className="mt-2 pt-3 border-t border-gray-100 space-y-2">
            {unlockedContact ? (
              <>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">Contact unlocked</span>
                </div>

                <div className="rounded-xl bg-green-50 border border-green-100 px-3 py-2 text-xs text-gray-800 space-y-1">
                  {unlockedContact.name && <p><span className="font-semibold">Broker:</span> {unlockedContact.name}</p>}
                  {unlockedContact.phone && <p><span className="font-semibold">Phone:</span> {unlockedContact.phone}</p>}
                  {unlockedContact.whatsapp_link && <Button size="xs" variant="outline" className="mt-1 text-[11px] px-3 py-1" onClick={() => window.open(unlockedContact.whatsapp_link, "_blank")}>Chat on WhatsApp</Button>}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-600">Broker details &amp; WhatsApp contact are locked.</span>
                </div>

                <Button size="sm" className="w-full mt-1 bg-purple-600 hover:bg-purple-700 text-white text-sm" onClick={() => onUnlock(property.id)}>Unlock Contact &amp; Full Details</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
