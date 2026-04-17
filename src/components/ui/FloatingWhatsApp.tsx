"use client";

import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingWhatsApp() {
  const [showLabel, setShowLabel] = useState(false);
  const phoneNumber = "212600000000"; // Moroccan Agency Number
  const message = encodeURIComponent("Bonjour! Je souhaite réserver un véhicule de luxe chez Benadada Cars. Pourriez-vous m'assister?");

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 3000);
    const hideTimer = setTimeout(() => setShowLabel(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-white/95 backdrop-blur-xl border border-gray-100 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 mb-2 group cursor-pointer relative"
            onClick={() => setShowLabel(false)}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none mb-1">VIP Concierge</span>
              <span className="text-[11px] font-bold text-gray-700 whitespace-nowrap">Besoin d'aide ? Contactez-nous</span>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-gray-100" />
            <button className="ml-2 text-gray-300 hover:text-gray-500 transition-colors">
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowLabel(true)}
        className="relative group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
        <div className="relative bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center border-2 border-white/20">
          <MessageCircle size={28} strokeWidth={2.5} />
          
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      </motion.a>
    </div>
  );
}
