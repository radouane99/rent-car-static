"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Calendar, MessageCircle, 
  ArrowLeft, CheckCircle2, ShieldCheck, Zap 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type Car } from "@/components/cars/CarCard";
import { isCarAvailable } from "@/lib/reservations";

interface CarDetailsClientProps {
  id: string;
}

export default function CarDetailsClient({ id }: CarDetailsClientProps) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() } as Car);
        }
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 flex items-center justify-center text-primary uppercase tracking-[0.4em] animate-pulse">Initializing Luxury...</div>;
  if (!car) return <div className="min-h-screen pt-32 flex items-center justify-center text-white/50 uppercase tracking-[0.4em]">Vehicle Not Located</div>;

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    const message = encodeURIComponent(`Hello Benadada Cars! 🏎️\n\nI would like to reserve the luxury ${car.name}.\n\n👤 Name: ${bookingData.name}\n📅 Dates: ${bookingData.startDate} to ${bookingData.endDate}\n\nPlease confirm availability.`);
    window.open(`https://wa.me/212600000000?text=${message}`, "_blank");
    
    setBookingStatus("success");
    setIsSubmitting(false);
  };

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6">
        <Link href="/cars" className="inline-flex items-center gap-2 text-white/30 hover:text-primary transition-colors mb-12 uppercase text-[10px] tracking-[0.3em] font-black">
          <ArrowLeft size={14} /> Back to Fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div className="relative aspect-[16/10] overflow-hidden glass border-primary/20 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
               <img 
                 src={car.image} 
                 alt={car.name} 
                 className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute top-8 left-8">
                 <span className="bg-primary/90 backdrop-blur-md text-black font-black px-8 py-3 uppercase tracking-[0.3em] text-[10px]">
                   {car.category}
                 </span>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, label: "Safety", val: "Elite Protection" },
                { icon: Zap, label: "Response", val: "Instant VIP" },
                { icon: CheckCircle2, label: "Handover", val: "On-Site" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="p-4 glass rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                      <item.icon size={18} className="text-primary" />
                   </div>
                   <p className="text-white/20 font-black text-[9px] uppercase tracking-[0.2em] mb-1">{item.label}</p>
                   <p className="text-white text-[10px] uppercase font-bold tracking-widest">{item.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Command Asset</span>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white italic leading-none mb-6">
                {car.name}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-white font-black text-4xl tracking-tighter">${car.price_per_day}</span>
                <span className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">Daily Protocol Rate</span>
              </div>
            </div>

            <p className="text-white/40 text-[13px] uppercase tracking-widest font-bold leading-loose mb-16 border-l-2 border-primary/20 pl-8">
              {car.description}
            </p>

            <div className="glass p-10 border-primary/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
               
               <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10 flex items-center gap-4">
                 <Calendar size={16} className="text-primary" /> Initiate Reservation
               </h3>
               
               <form onSubmit={handleRequest} className="space-y-8">
                  <div className="space-y-2">
                     <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-black">Full Name</label>
                     <input 
                       type="text" required placeholder="Enter your identity..."
                       className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-xs text-white focus:outline-none focus:border-primary transition-all rounded-none"
                       value={bookingData.name}
                       onChange={e => setBookingData({...bookingData, name: e.target.value})}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-black">Arrival</label>
                       <input 
                         type="date" required 
                         className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-xs text-white focus:outline-none focus:border-primary [color-scheme:dark] rounded-none"
                         value={bookingData.startDate}
                         onChange={e => setBookingData({...bookingData, startDate: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-black">Departure</label>
                       <input 
                         type="date" required 
                         className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-xs text-white focus:outline-none focus:border-primary [color-scheme:dark] rounded-none"
                         value={bookingData.endDate}
                         onChange={e => setBookingData({...bookingData, endDate: e.target.value})}
                       />
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-primary text-black font-black tracking-[0.4em] text-[10px] rounded-none hover:scale-102 transition-transform shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
                    {isSubmitting ? "PROCESSING REQUEST..." : "SECURE RESERVATION"}
                  </Button>
               </form>

               <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <MessageCircle size={14} className="text-primary" />
                     <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold italic">24/7 Concierge Active</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-primary/40 font-black">Benadada Exclusive</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
