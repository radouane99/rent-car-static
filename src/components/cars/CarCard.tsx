import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Fuel, Users, Gauge, ArrowRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="group h-full flex flex-col p-0">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-dark text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              {car.category}
            </span>
          </div>
          {!car.available && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-[0.2em] border border-white/40 px-6 py-2">Booked</span>
             </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">{car.name}</h3>
              <p className="text-white/40 text-xs italic">Experience the power</p>
            </div>
            <div className="text-right">
              <span className="block text-primary font-bold text-lg">${car.price_per_day}</span>
              <span className="text-[10px] text-white/30 uppercase tracking-tighter">Per Day</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
            <div className="flex flex-col items-center gap-1">
               <Fuel size={14} className="text-primary/60" />
               <span className="text-[10px] text-white/50 uppercase">{car.specs?.fuel || "Gas"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
               <Users size={14} className="text-primary/60" />
               <span className="text-[10px] text-white/50 uppercase">{car.specs?.seats || 2} Seats</span>
            </div>
            <div className="flex flex-col items-center gap-1">
               <Gauge size={14} className="text-primary/60" />
               <span className="text-[10px] text-white/50 uppercase">{car.specs?.acceleration || "3.2s"}</span>
            </div>
          </div>

          <div className="mt-auto">
            <Link href={`/cars/${car.id}`}>
              <Button variant="outline" className="w-full flex items-center gap-2 group/btn">
                Reserve Now
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
