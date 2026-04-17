"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/LanguageContext";
import Image from "next/image";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] lg:h-screen w-full flex flex-col justify-center overflow-hidden bg-white pt-20">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-left z-10 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] uppercase font-black tracking-[0.3em] text-primary">
              Expérience de Location de Voitures Premium
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-dark mb-8 leading-[0.9] uppercase"
          >
            Conduisez Vos <br />
            <span className="text-gold-gradient tracking-tight">Rêves</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl text-gray-500 text-sm md:text-base mb-12 leading-relaxed font-medium"
          >
            Vivez le luxe et la fiabilité avec notre flotte premium. Des réunions d'affaires aux aventures du week-end, trouvez le véhicule parfait pour chaque voyage.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
          >
            <Button 
              size="lg" 
              className="px-10 py-7 bg-primary text-white rounded-xl font-black tracking-[0.2em] text-[10px] hover:scale-105 transition-transform shadow-xl shadow-primary/30" 
              onClick={() => (window.location.href = "/cars")}
            >
              DÉCOUVRIR LA FLOTTE
            </Button>
            <button className="text-[10px] uppercase font-black tracking-[0.2em] text-dark/40 hover:text-dark transition-all py-5 px-10 border border-dark/5 rounded-xl hover:bg-dark/5">
              En savoir plus
            </button>
          </motion.div>
        </div>

        {/* Right Visual */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image 
              src="/hero-visual.png" 
              alt="Elite Garage Illustration" 
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl -z-10 rounded-full" />
        </div>
      </div>

      {/* Stats Row (RealRent Style) */}
      <div className="w-full border-t border-gray-50 bg-[#FAFAFA] py-16 mt-auto">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl">
          {[
            { label: "Clients Satisfaits", value: "1000+" },
            { label: "Voitures Premium", value: "150+" },
            { label: "Assistance", value: "24/7" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <span className="block text-4xl md:text-5xl font-display font-black text-dark group-hover:text-primary transition-colors duration-500">
                {stat.value}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-3 font-black">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
