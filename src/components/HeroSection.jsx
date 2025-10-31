"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import heroAnim from "@/assets/house.json";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLottie = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Reusable animation variants
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex flex-col  md:flex-row justify-between items-center px-8 md:px-20 py-28 bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30"
    >
      {/* ===== Animated Gradient Orbs ===== */}
      <motion.div className="absolute top-[-6rem] left-[-6rem] w-[20rem] h-[20rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <motion.div className="absolute bottom-[-6rem] right-[-4rem] w-[22rem] h-[22rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />

      {/* ===== Left Section ===== */}
      <div className="flex-1 z-10 space-y-6">
        <motion.div {...fadeUp(0.1)}>
          <Badge
            variant="secondary"
            className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-1" /> AI meets Real Estate
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp(0.25)}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug"
        >
          Simplify Property Management with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PropertyTrackkrr
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="text-gray-600 text-base md:text-lg max-w-md"
        >
          Automate property uploads, manage leads, and handle conversations — all through WhatsApp, powered by AI and a modern dashboard.
        </motion.p>

        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap gap-3"
        >
          <Button
  size="lg"
  onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
>
  <MessageCircle className="mr-2 h-5 w-5" /> Try on WhatsApp
</Button>


          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open("/register", "_self")}
            className="hover:bg-purple-50 hover:text-purple-700 transition-all hover:scale-105"
          >
            Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* ===== Right Section (Lottie + Glassmorphic Cards) ===== */}
      <div className="flex-1 relative mt-10 md:mt-0 flex justify-center items-center">
        <motion.div
          style={{ y: yLottie }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative"
        >
          {/* Floating dashboard cards */}
          <div className="absolute top-8 right-16 z-20">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 w-56"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-sm text-gray-800">
                  🏡 Property Added
                </p>
                <span className="text-xs text-green-600 font-medium">New</span>
              </div>
              <p className="text-xs text-gray-600">3 BHK Apartment • Pune</p>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-10 z-20">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 w-56"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-sm text-gray-800">
                  💬 Lead Connected
                </p>
                <span className="text-xs text-blue-600 font-medium">Chat</span>
              </div>
              <p className="text-xs text-gray-600">Ramesh via WhatsApp</p>
            </motion.div>
          </div>

          <Lottie
            animationData={heroAnim}
            loop
            className="w-full h-[420px] z-10 relative"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 via-white/40 to-transparent"></div>
    </section>
  );
}
