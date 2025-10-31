"use client";

import { motion } from "framer-motion";
import { Bot, Building2, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-blue-600" />,
    title: "AI-Powered Assistant",
    desc: "Add or edit listings instantly through chat. Your AI assistant handles formatting, details, and uploads seamlessly.",
    accent: "from-blue-400/30 via-blue-200/20 to-transparent",
  },
  {
    icon: <Building2 className="w-8 h-8 text-purple-600" />,
    title: "Smart Property Dashboard",
    desc: "View, manage, and filter all your properties in one sleek dashboard — designed for brokers, built for simplicity.",
    accent: "from-purple-400/30 via-purple-200/20 to-transparent",
  },
  {
    icon: <BarChart className="w-8 h-8 text-green-600" />,
    title: "Analytics & Insights",
    desc: "Visualize performance, discover trends, and unlock insights to grow your real estate business intelligently.",
    accent: "from-green-400/30 via-green-200/20 to-transparent",
  },
];

export default function FeatureSection() {
  // ✨ Shared fade-up variant for cleaner consistency
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-gray-50 via-white to-blue-50/40">
      {/* === Floating Background Glows === */}
      <motion.div
        className="absolute top-[-8rem] left-[-6rem] w-[26rem] h-[26rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] right-[-6rem] w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Section Header === */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.div {...fadeUp(0.1)}>
          <Badge
            variant="outline"
            className="px-5 py-1 mb-3 rounded-full border-blue-600/20 text-blue-700 bg-blue-50/70 backdrop-blur-md"
          >
            Powerful, Simple, Automated
          </Badge>
        </motion.div>

        <motion.h2
          {...fadeUp(0.25)}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3"
        >
          Everything You Need to Grow Smarter
        </motion.h2>

        <motion.p
          {...fadeUp(0.4)}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Manage listings, engage clients, and analyze performance — all from one unified AI platform.
        </motion.p>

        <motion.div
          className="h-[2px] w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-8"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "5rem", opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>

      {/* === Feature Cards Grid === */}
      <div className="relative z-10 grid gap-10 px-8 md:px-20 md:grid-cols-3 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.15,
              ease: [0.22, 1, 0.36, 1], // smoother cubic-bezier
            }}
            viewport={{ once: true }}
          >
            <Card
              className={`relative group h-full flex flex-col justify-between rounded-2xl border border-gray-100/40 
                bg-white/70 backdrop-blur-xl hover:shadow-xl transition-all duration-500 overflow-hidden`}
            >
              {/* Gradient glow highlight on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${f.accent} blur-lg`}
              ></div>

              <CardContent className="relative z-10 p-8 flex flex-col items-start text-left flex-grow">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 mb-6"
                >
                  {f.icon}
                </motion.div>

                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 leading-snug mb-3">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* === Smooth Transition to Footer === */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-50/40 via-white/60 to-transparent"></div>
    </section>
  );
}
