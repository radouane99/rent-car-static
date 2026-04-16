"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="/hero-car.png" 
          alt="Luxury Car hero" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-primary font-bold uppercase tracking-[0.5em] text-xs mb-6 block"
        >
          Prime Selection
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-tight"
        >
          DRIVE INTO <br />
          <span className="text-gold-gradient">PURE LUXURY</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-white/60 text-lg mb-12 font-light"
        >
          Experience the pinnacle of automotive excellence. From sleek supercars 
          to refined sedans, we provide the world's most prestigious vehicles.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
            View Fleet
          </Button>
          <Button variant="outline" size="lg">
            VIP Membership
          </Button>
        </motion.div>
      </div>

      {/* Side decorative text */}
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <p className="text-white/10 text-sm rotate-90 origin-left uppercase tracking-[1em]">
          ELEGANCE • POWER • PRESTIGE
        </p>
      </div>
    </section>
  );
}
