import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ items = [], height = "220px" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 text-gray-400"
        style={{ height }}
      >
        <ImageIcon size={32} className="opacity-40" />
        <p className="ml-2 text-sm">No Media</p>
      </div>
    );
  }

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-50 rounded-t-2xl"
      style={{ height }}
    >
      {/* Transition Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {currentItem.type === "video" ? (
            <video
              src={currentItem.url}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={currentItem.url}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-1">
        {items.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 w-4 rounded-full cursor-pointer transition-all ${
              i === currentIndex
                ? "bg-blue-600 w-6"
                : "bg-white/60 hover:bg-white/80"
            }`}
          ></div>
        ))}
      </div>

      {/* Media Type Label */}
      <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
        {currentItem.type === "video" ? (
          <Video size={12} />
        ) : (
          <ImageIcon size={12} />
        )}
        {currentItem.type.toUpperCase()}
      </div>
    </div>
  );
}
