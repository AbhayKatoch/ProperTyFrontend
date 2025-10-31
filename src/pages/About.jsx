import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Users, Building2, Brain } from "lucide-react";

export default function About() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true },
  });

  const missionCards = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "AI-Driven Simplicity",
      desc: "We bring automation to brokers by letting them manage listings, clients, and updates — all through WhatsApp.",
      accent: "from-blue-400/30 via-blue-200/20 to-transparent",
    },
    {
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      title: "Empowering Real Estate",
      desc: "Our dashboard unifies every property, lead, and chat — so you can focus on deals, not data entry.",
      accent: "from-purple-400/30 via-purple-200/20 to-transparent",
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "Human + Machine Synergy",
      desc: "We believe AI should amplify human relationships — helping brokers connect faster, smarter, and more meaningfully.",
      accent: "from-pink-400/30 via-pink-200/20 to-transparent",
    },
  ];

  return (
    <>

      <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30">
        {/* === Floating Background Orbs === */}
        <motion.div
          className="absolute top-[-8rem] left-[-8rem] w-[25rem] h-[25rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ x: [0, 30, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-8rem] right-[-8rem] w-[28rem] h-[28rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* === Main Content === */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-24">
          {/* === Header === */}
          <motion.div {...fadeUp(0.1)} className="text-center mb-16">
            <Badge
              variant="outline"
              className="px-4 py-1 mb-3 rounded-full border-blue-600/20 text-blue-700 bg-blue-50/70 backdrop-blur-md"
            >
              About PropertyTrackkrr
            </Badge>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              We’re Redefining{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real Estate with AI
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              PropertyTrackkrr is a new-age platform where automation meets
              real estate. We empower brokers with AI tools that simplify every
              stage of property management — from onboarding to closing.
            </p>

            <motion.div
              className="h-[2px] w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* === Mission Cards === */}
          <div className="grid md:grid-cols-3 gap-10 mb-20 max-w-6xl mx-auto">
            {missionCards.map((f, i) => (
              <motion.div key={i} {...fadeUp(0.2 + i * 0.1)}>
                <Card
                  className={`relative group h-full flex flex-col justify-between rounded-2xl border border-gray-100/40 
                    bg-white/70 backdrop-blur-xl hover:shadow-xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Gradient hover glow */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${f.accent} blur-lg`}
                  ></div>

                  <CardContent className="relative z-10 p-8 flex flex-col flex-grow items-start text-left">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 mb-6"
                    >
                      {f.icon}
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* === Our Journey Section === */}
          <motion.div
            {...fadeUp(0.4)}
            className="text-center max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            <p className="text-gray-600 text-lg mb-10">
              From a small team of innovators to a growing AI-driven real estate
              platform, our mission remains clear — make property management
              intuitive, automated, and human.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              {[
                {
                  year: "2024",
                  text: "PropertyTrackkrr idea is born — bridging AI with real estate operations.",
                },
                {
                  year: "2025",
                  text: "Launched beta with seamless WhatsApp integration & broker dashboard.",
                },
                {
                  year: "Future",
                  text: "Expanding globally — building smarter tools for 10,000+ brokers.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl border border-gray-100/60 bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition w-full md:w-64"
                >
                  <h4 className="text-xl font-bold text-blue-700 mb-2">
                    {step.year}
                  </h4>
                  <p className="text-gray-600 text-sm">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === Bottom Gradient Transition === */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-50/40 via-white/60 to-transparent"></div>
      </section>
    </>
  );
}
