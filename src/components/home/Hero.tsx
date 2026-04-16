"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark">
      {/* Background with Cinematic Overlay */}
      <div className="absolute inset-0 z-0 scale-105">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-dark z-10" />
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80" 
          alt="Luxury Fleet" 
          className="w-full h-full object-cover grayscale-[0.5] brightness-75"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="mb-12 inline-flex items-center space-x-4 border border-primary/20 bg-primary/5 px-6 py-2 backdrop-blur-md rounded-full"
        >
           <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary/80">Available in Casablanca & Rabat</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-8xl font-display font-black text-white mb-6 leading-none italic"
        >
          ELEGANCE <br />
          <span className="text-gold-gradient non-italic tracking-normal">REDEFINED</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto text-white/40 text-xs md:text-sm mb-12 uppercase tracking-[0.3em] font-bold leading-relaxed"
        >
          Curating the world’s most prestigious vehicles. <br className="hidden md:block"/> 
          Experience automotive perfection with the Benadada signature service.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.9 }}
           className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="px-12 py-8 bg-primary text-black rounded-none font-black tracking-[0.3em] text-[10px] hover:scale-105 transition-transform" onClick={() => (window.location.href = "/cars")}>
            ENTER THE FLEET
          </Button>
          <button className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 hover:text-primary transition-colors py-4 px-8 border border-white/5 hover:border-primary/30">
            PRIVATE CHAUFFEUR
          </button>
        </motion.div>
      </div>

      {/* Decorative side text */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block overflow-hidden h-[500px]">
        <motion.div 
           animate={{ y: [0, -250, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="text-white/[0.03] text-6xl font-black rotate-90 origin-center whitespace-nowrap tracking-[0.5em]"
        >
          BENADADA CARS LUXURY RENTAL
        </motion.div>
      </div>
    </section>
  );
}
