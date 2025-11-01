"use client";

import { motion } from "framer-motion";
import { Bot, Building2, BarChart3, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Features() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  const coreFeatures = [
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Assistant",
      desc: "Interact with your PropTrackrr assistant directly via WhatsApp — add listings, connect leads, and get updates in real-time.",
      color: "from-blue-500/20 via-blue-300/10 to-transparent",
    },
    {
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      title: "Smart Property Dashboard",
      desc: "Easily manage all your listings, clients, and leads from a single, intelligent dashboard designed for brokers.",
      color: "from-purple-500/20 via-purple-300/10 to-transparent",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Analytics & Insights",
      desc: "Understand your business like never before — track performance, lead conversions, and top-performing listings.",
      color: "from-green-500/20 via-green-300/10 to-transparent",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-sky-600" />,
      title: "WhatsApp Automation",
      desc: "Handle all customer conversations, queries, and property sharing directly through WhatsApp — powered by Meta Cloud API.",
      color: "from-sky-500/20 via-sky-300/10 to-transparent",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      title: "Secure Cloud Storage",
      desc: "Your data is safely encrypted and stored — ensuring all client and property details remain private and secure.",
      color: "from-teal-500/20 via-teal-300/10 to-transparent",
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Team Collaboration",
      desc: "Invite your teammates, assign properties, and collaborate efficiently on leads and deals in real-time.",
      color: "from-amber-500/20 via-amber-300/10 to-transparent",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30">
      {/* Floating Glows */}
      <motion.div
        className="absolute top-[-10rem] left-[-8rem] w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] right-[-8rem] w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header Section */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.div {...fadeUp(0.1)}>
          <Badge
            variant="outline"
            className="px-5 py-1 mb-3 rounded-full border-blue-600/20 text-blue-700 bg-blue-50/70 backdrop-blur-md"
          >
            Intelligent • Automated • Secure
          </Badge>
        </motion.div>

        <motion.h2
          {...fadeUp(0.25)}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3"
        >
          Explore Our Powerful Features
        </motion.h2>

        <motion.p
          {...fadeUp(0.4)}
          className="text-gray-600 text-lg max-w-2xl mx-auto"
        >
          From AI-assisted property management to automated client communication,
          PropTrackrr simplifies everything for brokers.
        </motion.p>
      </div>

      {/* Core Feature Cards */}
      <div className="relative z-10 grid gap-10 px-8 md:px-20 md:grid-cols-3 max-w-7xl mx-auto">
        {coreFeatures.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <Card
              className={`relative group h-full flex flex-col justify-between rounded-2xl border border-gray-100/40 
                bg-white/70 backdrop-blur-xl hover:shadow-xl transition-all duration-500 overflow-hidden`}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${f.color} blur-lg`}
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

      {/* Future Vision Section */}
      <motion.div
        {...fadeUp(0.3)}
        className="relative z-10 text-center mt-24 px-6"
      >
        <h3 className="text-3xl font-semibold text-gray-900 mb-3">
          What’s Next for PropTrackrr?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          We’re building deeper integrations with WhatsApp Commerce, AI-driven
          lead scoring, and visual property matching — so brokers can close
          deals faster than ever.
        </p>

        <Button
          onClick={() => window.open("https://wa.me/919876543210", "_blank")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
        >
          <MessageCircle className="w-5 h-5" /> Try on WhatsApp
        </Button>
      </motion.div>
    </section>
  );
}
