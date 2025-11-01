"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-blue-50/40 to-purple-50/30">
      {/* === Background Glows === */}
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

      {/* === Page Header === */}
      <div className="relative z-10 text-center mb-16 px-6">
        <Badge
          variant="outline"
          className="px-5 py-1 mb-3 rounded-full border-blue-600/20 text-blue-700 bg-blue-50/70 backdrop-blur-md"
        >
          Let’s Connect
        </Badge>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
          Get in Touch with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PropTrackrr
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have a question, idea, or partnership proposal? We’d love to hear from
          you. Let’s shape the future of real estate together.
        </p>
      </div>

      {/* === Contact Form & Info === */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-8 md:px-16">
        {/* Contact Info Section */}
        <motion.div
          {...fadeIn(0.1)}
          className="space-y-8 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-2xl p-8 shadow-md"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Reach us directly
          </h3>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <p>+91 1234567890</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-purple-600" />
              <p>support@PropTrackrr.com</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-green-600" />
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.form
          {...fadeIn(0.3)}
          className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl p-8 shadow-md flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Send us a Message
          </h3>
          <Input
            type="text"
            placeholder="Your Name"
            required
            className="border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="email"
            placeholder="Your Email"
            required
            className="border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          <Textarea
            placeholder="Your Message"
            rows={4}
            required
            className="border-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md hover:scale-[1.02] transition-all"
          >
            Send Message
          </Button>
        </motion.form>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => window.open("https://wa.me/", "_blank")}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
