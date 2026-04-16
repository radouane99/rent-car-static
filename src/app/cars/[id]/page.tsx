"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Fuel, Users, Gauge, Calendar, MessageCircle, 
  ArrowLeft, CheckCircle2, ShieldCheck, Zap 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type Car } from "@/components/cars/CarCard";
import { isCarAvailable } from "@/lib/reservations";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    pickup: "",
    dropoff: ""
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, "cars", id as string);
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

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("checking");
    setErrorMessage("");
    
    try {
      const available = await isCarAvailable(id as string, bookingData.startDate, bookingData.endDate);
      if (!available) {
        setBookingStatus("error");
        setErrorMessage("Collision detected: This vehicle is already reserved for these dates.");
        return;
      }
      setBookingStatus("success");
    } catch (err) {
      setBookingStatus("error");
      setErrorMessage("System error during availability sweep.");
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello LuxDrive! I want to reserve the ${car.name}. \n\nDates: ${bookingData.startDate} to ${bookingData.endDate} \nLocations: ${bookingData.pickup} to ${bookingData.dropoff}`);
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6">
        <Link href="/cars" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-12 uppercase text-xs tracking-widest font-bold">
          <ArrowLeft size={16} /> Back to Fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Main Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm glass gold-border">
               <img 
                 src={car.image} 
                 alt={car.name} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute top-6 left-6">
                 <span className="bg-primary text-dark font-bold px-6 py-2 uppercase tracking-[0.2em] text-xs">
                   {car.category}
                 </span>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, label: "Insurance", val: "Premium" },
                { icon: Zap, label: "Assistance", val: "24/7 VIP" },
                { icon: CheckCircle2, label: "Delivery", val: "Available" },
              ].map((item, i) => (
                <GlassCard key={i} className="flex flex-col items-center justify-center py-6 text-center">
                   <item.icon size={20} className="text-primary mb-3" />
                   <p className="text-white font-bold text-[10px] uppercase tracking-widest">{item.label}</p>
                   <p className="text-white/40 text-[9px] uppercase mt-1">{item.val}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Details & Action */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Vehicle Excellence</span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none mb-4">
                {car.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold text-3xl font-display">${car.price_per_day}</span>
                <span className="text-white/30 uppercase tracking-tighter text-xs">Per Day Booking</span>
              </div>
            </div>

            <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
              {car.description}
            </p>

            <GlassCard className="p-8 border-primary/20">
               <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-3">
                 <Calendar size={18} className="text-primary" /> Availability & Booking
               </h3>
               
               <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Pick-up Date</label>
                       <input 
                         type="date" required 
                         className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-primary [color-scheme:dark]"
                         value={bookingData.startDate}
                         onChange={e => setBookingData({...bookingData, startDate: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Return Date</label>
                       <input 
                         type="date" required 
                         className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-primary [color-scheme:dark]"
                         value={bookingData.endDate}
                         onChange={e => setBookingData({...bookingData, endDate: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Pick-up Location</label>
                       <input 
                         type="text" required placeholder="Dubai, Paris, Beverly Hills..."
                         className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-primary"
                         value={bookingData.pickup}
                         onChange={e => setBookingData({...bookingData, pickup: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Drop-off Location</label>
                       <input 
                         type="text" required placeholder="Same as pickup"
                         className="w-full bg-white/5 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-primary"
                         value={bookingData.dropoff}
                         onChange={e => setBookingData({...bookingData, dropoff: e.target.value})}
                       />
                    </div>
                  </div>

                  {bookingStatus === "error" && (
                    <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">{errorMessage}</p>
                  )}
                  {bookingStatus === "success" && (
                    <p className="text-green-500 text-[10px] uppercase font-bold tracking-widest text-center">Path Clear! Vehicle is available.</p>
                  )}

                  <div className="flex flex-col gap-4 pt-4">
                    <Button type="submit" disabled={bookingStatus === "checking"} className="w-full h-14">
                      {bookingStatus === "checking" ? "Checking availability..." : "Verify Availability"}
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full h-14 bg-[#25D366] hover:bg-[#1fb355] text-white border-none flex items-center gap-3"
                    >
                      <MessageCircle size={20} />
                      Reserve on WhatsApp
                    </Button>
                  </div>
               </form>

               <p className="text-center text-[10px] text-white/30 mt-6 uppercase tracking-tighter leading-relaxed">
                 Instant verification powered by LuxDrive Concierge Cloud.<br />
                 Payments are handled privately upon delivery.
               </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
