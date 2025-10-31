"use client";

import { motion } from "framer-motion";
import { Smartphone, LayoutDashboard, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

export default function HowItWorks() {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30 py-20">
      {/* Background Glows */}
      <motion.div
        className="absolute top-[-10rem] left-[-8rem] w-[28rem] h-[28rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] right-[-8rem] w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-24 px-6">
        <Badge
          variant="outline"
          className="px-5 py-1 mb-3 rounded-full border-blue-600/20 text-blue-700 bg-blue-50/70 backdrop-blur-md"
        >
          Seamless, Smart, Scalable
        </Badge>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
          How{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PropertyTrackkrr
          </span>{" "}
          Works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A connected experience — from AI chat to smart dashboard to data-driven insights.
        </p>
      </div>

      {/* === Step 1: Chat on WhatsApp === */}
      <motion.div
        {...fadeIn(0.1)}
        className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-12 mb-32"
      >
        <div className="flex-1 text-center md:text-left space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
            <Smartphone className="w-7 h-7" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">
            Chat on WhatsApp
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Just message your AI assistant to list a property — it understands,
            formats, and uploads automatically.
          </p>
        </div>

        {/* Mock Chat UI */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex-1 mt-10 md:mt-0 flex justify-center"
        >
          <div className="w-[340px] bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 shadow-md relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 text-sm"
            >
              <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-xl w-fit ml-auto shadow-sm">
                Add new property
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl w-fit shadow-sm"
              >
                Sure! Please share property details.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-xl w-fit ml-auto shadow-sm"
              >
                3 BHK Flat in Pune, ₹85L
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* === Step 2: Manage in Dashboard === */}
      <motion.div
        {...fadeIn(0.3)}
        className="relative flex flex-col md:flex-row-reverse items-center justify-between max-w-6xl mx-auto px-6 md:px-12 mb-32"
      >
        <div className="flex-1 text-center md:text-left space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-md">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">
            Manage Effortlessly in Dashboard
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your properties appear instantly — clean, formatted, and organized.
            Filter, edit, and manage everything with ease.
          </p>
        </div>

        {/* Mock Dashboard UI */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex-1 mt-10 md:mt-0 flex justify-center"
        >
          <div className="w-[400px] bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-md p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {["3 BHK Flat", "2 BHK Villa", "Office Space", "Studio"].map(
                (name, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-4 text-center text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
                  >
                    {name}
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* === Step 3: Analytics & Insights === */}
      <motion.div
        {...fadeIn(0.5)}
        className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 md:px-12"
      >
        <div className="flex-1 text-center md:text-left space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md">
            <BarChart3 className="w-7 h-7" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">
            Get AI-Powered Insights
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Instantly see trends — views, conversions, and engagement. Your data
            turns into decisions.
          </p>
        </div>

        {/* Mock Analytics UI */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex-1 mt-10 md:mt-0 flex justify-center"
        >
          <div className="w-[400px] bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-md p-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
              className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
              className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-3"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "90%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* === CTA === */}
      <motion.div
      {...fadeIn(0.8)}
      className="text-center mt-24 md:mt-32 space-y-6"
    >
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
        Experience it yourself — AI that works like magic ✨
      </h3>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all bg-gradient-to-r bg-[#25D366] hover:bg-[#1EBE5D]"
      >
        <MessageCircle className="w-5 h-5" />
        Try on WhatsApp
      </motion.button>
    </motion.div>
    </section>
  );
}
