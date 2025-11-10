"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Users, Wrench, DollarSign, MessageCircle, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import hostAnim from "@/assets/House.json"; // ✅ Use a home maintenance or rental service animation

export default function Hostcare() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 min-h-screen flex flex-col text-gray-800 overflow-hidden">
      {/* === Navbar === */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm z-50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-md">
              <Home className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hostcare
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <a href="#why" className="hover:text-blue-600 transition">Why Us</a>
            <a href="#how" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </div>

          <Button
            className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 shadow-sm transition-all"
            onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Talk to Us
          </Button>
        </div>
      </motion.nav>

      {/* === Hero Section === */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 ">
        {/* Left */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div {...fadeUp(0.1)} className="flex justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm shadow-sm">
              <Sparkles className="w-4 h-4" /> Professional Property Care
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-4xl md:text-5xl font-bold leading-snug"
          >
            Manage Your Property Effortlessly with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hostcare
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-gray-600 text-lg max-w-md mx-auto md:mx-0"
          >
            We handle everything from tenant management to rent collection and maintenance, 
            so you can focus on what matters most.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 shadow-md"
              onClick={() => document.getElementById("why").scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-purple-50 hover:text-purple-700 transition-all"
              onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right (Lottie) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <Lottie animationData={hostAnim} loop className="w-full max-w-md md:max-w-xl h-[350px] md:h-[500px]" />
        </motion.div>
      </section>

      {/* === Why Us Section === */}
      <section id="why" className="py-20 px-6 md:px-20 bg-white/70 backdrop-blur-md text-center">
        <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why Choose <span className="text-blue-600">Hostcare</span>?
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="w-10 h-10 text-blue-600" />,
              title: "Tenant Management",
              desc: "We handle finding, verifying, and managing tenants for your peace of mind.",
            },
            {
              icon: <DollarSign className="w-10 h-10 text-purple-600" />,
              title: "On-Time Rent Collection",
              desc: "Receive timely rent directly to your account with transparent reporting.",
            },
            {
              icon: <Wrench className="w-10 h-10 text-green-600" />,
              title: "Maintenance & Upkeep",
              desc: "We take care of property upkeep, repairs, and regular inspections.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.2 + i * 0.15)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === How It Works === */}
      <section id="how" className="py-20 px-6 md:px-20 bg-gradient-to-b from-purple-50/60 to-white text-center">
        <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How It Works
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              step: "01",
              title: "List Your Property",
              desc: "Share property details and we take care of everything else.",
            },
            {
              step: "02",
              title: "We Manage Everything",
              desc: "From finding tenants to collecting rent, we handle it all efficiently.",
            },
            {
              step: "03",
              title: "Relax & Earn",
              desc: "Enjoy consistent rental income and zero management stress.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.2 + i * 0.15)}
              className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8"
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                Step {step.step}
              </span>
              <h3 className="mt-6 text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CTA Section === */}
      <section id="contact" className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-20">
        <motion.h2 {...fadeUp(0.1)} className="text-3xl md:text-4xl font-bold mb-4">
          Partner with Hostcare Today
        </motion.h2>
        <motion.p {...fadeUp(0.2)} className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          Experience seamless property management — from tenant handling to maintenance — all handled by our expert team.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-md"
            onClick={() => document.getElementById("hero").scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-black hover:bg-white/10"
            onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Talk to Us
          </Button>
        </motion.div>
      </section>

      {/* === Footer === */}
      <footer className="bg-white border-t border-gray-100 text-center py-8 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-blue-600">Hostcare</span>. All rights reserved.</p>
        <p className="mt-2 text-gray-500">A service by <span className="text-purple-600 font-medium">PropertyTrackkrr</span></p>
      </footer>
    </div>
  );
}
