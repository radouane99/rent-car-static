"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/LanguageContext";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Custom cross-version SVGs for reliability
const FuelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22L15 22"/><path d="M4 9L15 9"/><path d="M14 22L14 4.5C14 3.12 12.88 2 11.5 2H6.5C5.12 2 4 3.12 4 4.5V22"/><path d="M18 5L18 11"/><path d="M14 13L21 13"/><path d="M21 21V13"/>
  </svg>
);

const MapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export interface Car {
  id: string;
  name: string;
  price_per_day: number;
  image: string;
  category: string;
  available: boolean;
  description: string;
  specs?: {
    fuel: string;
    seats: number;
    acceleration: string;
  }
}

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  
  const queryString = searchParams.toString();
  const detailsUrl = `/cars/${car.id}${queryString ? `?${queryString}` : ""}`;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const pickup = searchParams.get("pickup") || "...";
    const dropoff = searchParams.get("dropoff") || "...";
    const startDate = searchParams.get("startDate") || "...";
    const endDate = searchParams.get("endDate") || "...";

    const phone = "212600000000";
    const text = `*CONFIRMATION DE RÉSERVATION - BENADADA CARS* 🏎️\n\n` +
                 `*Véhicule:* ${car.name}\n\n` +
                 `📍 *Prise:* ${pickup}\n` +
                 `📍 *Retour:* ${dropoff}\n` +
                 `📅 *Du:* ${startDate}\n` +
                 `📅 *Au:* ${endDate}\n\n` +
                 `_Bonjour, je souhaite confirmer la réservation de ce véhicule. Est-il disponible?_`;

    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group h-full flex flex-col relative">
        
        {/* Top-Right Price Tag (RealRent Style) */}
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-primary px-5 py-3 rounded-2xl shadow-xl shadow-primary/20 flex flex-col items-center">
            <span className="text-white font-black text-xl leading-none">${car.price_per_day}</span>
            <span className="text-white/60 text-[8px] uppercase tracking-widest font-black mt-1">/jour</span>
          </div>
        </div>

        {/* Link Wrapper for Content */}
        <Link href={detailsUrl} className="flex flex-col flex-grow">
          {/* Image Container */}
          <div className="relative aspect-[16/11] overflow-hidden">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <span className="bg-dark/80 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 uppercase tracking-[0.2em] rounded-xl border border-white/10">
                {car.category}
              </span>
            </div>

            {!car.available && (
               <div className="absolute inset-0 bg-dark/70 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-white font-black uppercase tracking-[0.4em] border border-white/20 px-10 py-4 rounded-xl text-[10px]">
                    Non Disponible
                  </span>
               </div>
            )}
          </div>

          {/* Info Area */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-display font-black text-dark tracking-tighter uppercase mb-2 group-hover:text-primary transition-colors">
              {car.name}
            </h3>
            
            <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 mb-8 font-medium">
              {car.description || "Élégance, performance et confort absolu pour vos trajets d'exception."}
            </p>

            {/* Feature Icons (RealRent Style) */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-gray-500">
                <FuelIcon />
                <span className="text-[10px] font-black uppercase tracking-tight">Gasoline</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-gray-500">
                <MapIcon />
                <span className="text-[10px] font-black uppercase tracking-tight">GPS</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-gray-500">
                <ShieldIcon />
                <span className="text-[10px] font-black uppercase tracking-tight">Assurance</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Action Button - Large Sidebar Style */}
        <div className="p-2 pt-0">
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full h-16 bg-dark text-white rounded-2xl flex items-center justify-center gap-3 font-black tracking-[0.3em] text-[10px] hover:bg-primary transition-all duration-500 group/btn"
          >
            <MessageCircle size={18} className="text-primary group-hover:text-white" />
            BOOK NOW
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
