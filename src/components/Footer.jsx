"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white via-blue-50/40 to-purple-50/40 pt-20 pb-8 overflow-hidden">
      {/* === Background Glow === */}
      
      <motion.div
        className="absolute top-[-6rem] left-[-6rem] w-[20rem] h-[20rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-6rem] right-[-6rem] w-[20rem] h-[20rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* === Footer Content === */}
      <div className="relative z-10 container mx-auto px-8 md:px-16">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10"
        >
          {/* Brand Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PropertyTrackkrr
            </h3>
            <p className="text-gray-600 max-w-sm mx-auto md:mx-0">
              The AI-powered real estate management platform helping brokers
              automate listings, client conversations, and insights — all in one place.
            </p>
            <div className="flex gap-3 justify-center md:justify-start mt-3">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover:bg-blue-50"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover:bg-blue-50"
              >
                <Twitter className="w-5 h-5 text-blue-500" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover:bg-blue-50"
              >
                <Instagram className="w-5 h-5 text-purple-500" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full hover:bg-blue-50"
              >
                <Facebook className="w-5 h-5 text-blue-700" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 grid grid-cols-2 gap-10 text-center md:text-left">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#features" className="hover:text-purple-600 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-purple-600 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-purple-600 transition">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#about" className="hover:text-purple-600 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-purple-600 transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-purple-600 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Separator */}
        <Separator className="my-10 bg-gray-300/50" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4"
        >
          <p>© {new Date().getFullYear()} PropertyTrackkrr. All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#terms" className="hover:text-purple-600 transition">
              Terms
            </a>
            <span>•</span>
            <a href="#privacy" className="hover:text-purple-600 transition">
              Privacy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
