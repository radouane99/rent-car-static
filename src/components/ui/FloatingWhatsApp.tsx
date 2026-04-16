"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  const phoneNumber = "1234567890"; // Replace with actual number
  const message = encodeURIComponent("Hello! I'm interested in renting a luxury car from LuxDrive. Could you please provide more information?");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-10 right-10 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
      </span>
    </motion.a>
  );
}
