"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, MessageCircle, 
  ArrowLeft, CheckCircle2, ShieldCheck, Zap, 
  MapPin, Clock, Info
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { type Car } from "@/components/cars/CarCard";
import { useTranslation } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

// Custom cross-version SVGs for reliability
const FuelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22L15 22"/><path d="M4 9L15 9"/><path d="M14 22L14 4.5C14 3.12 12.88 2 11.5 2H6.5C5.12 2 4 3.12 4 4.5V22"/><path d="M18 5L18 11"/><path d="M14 13L21 13"/><path d="M21 21V13"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

interface CarDetailsClientProps {
  id: string;
}

function CarDetailsContent({ id }: CarDetailsClientProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [bookingData, setBookingData] = useState({
    pickup: searchParams.get("pickup") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });

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

  // Calculate rental days and total
  const rentalStats = useMemo(() => {
    if (!bookingData.startDate || !bookingData.endDate || !car) return { days: 0, total: 0 };
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      days: diffDays || 1,
      total: (diffDays || 1) * car.price_per_day
    };
  }, [bookingData, car]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center bg-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Chargement...</span>
      </div>
    </div>
  );

  if (!car) return <div className="min-h-screen pt-32 flex items-center justify-center text-white/50 bg-dark uppercase tracking-[0.4em]">Véhicule introuvable</div>;

  const handleWhatsAppBooking = () => {
    const phone = "212600000000";
    const text = `*CONFIRMATION DE RÉSERVATION - BENADADA CARS* 🏎️\n\n` +
                 `*Véhicule:* ${car.name}\n` +
                 `*Tarif:* ${car.price_per_day} $/jour\n\n` +
                 `📍 *Prise:* ${bookingData.pickup || "À confirmer"}\n` +
                 `📅 *Du:* ${bookingData.startDate || "À confirmer"}\n` +
                 `📅 *Au:* ${bookingData.endDate || "À confirmer"}\n` +
                 `⏳ *Durée:* ${rentalStats.days} jours\n` +
                 `💰 *TOTAL ESTIMÉ:* ${rentalStats.total} $\n\n` +
                 `_Bonjour, je souhaite réserver ce véhicule. Pouvons-nous confirmer les détails?_`;

    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="pt-40 pb-32 bg-dark min-h-screen">
      <div className="container mx-auto px-6">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/cars" className="p-3 bg-white/5 border border-white/10 rounded-full text-white/40 hover:text-white hover:bg-primary transition-all group">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex flex-col">
            <span className="text-white/20 text-[9px] uppercase font-black tracking-[0.3em]">Retour à la flotte</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">{car.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Visuals & Info (L: 8/12) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
               <img 
                 src={car.image} 
                 alt={car.name} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute top-8 left-8">
                  <span className="bg-primary/90 backdrop-blur-xl text-dark font-black px-6 py-3 uppercase tracking-[0.3em] text-[10px] rounded-xl shadow-2xl">
                    Elite Collection
                  </span>
               </div>
            </div>

            {/* Car Identity Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
               <div>
                  <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-none tracking-tighter uppercase mb-4">
                    {car.name}
                  </h1>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase font-black tracking-widest leading-none">
                        <FuelIcon /> <span className="pt-0.5">Gasoline</span>
                     </div>
                     <div className="h-4 w-[1.5px] bg-white/10" />
                     <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase font-black tracking-widest leading-none">
                        <ShieldIcon /> <span className="pt-0.5">Full Insurance</span>
                     </div>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col items-center">
                  <span className="text-primary font-black text-4xl leading-none tracking-tighter">${car.price_per_day}</span>
                  <span className="text-white/20 uppercase tracking-[0.3em] text-[10px] font-black mt-2">Par Jour</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                     <Info size={16} className="text-primary" /> Description
                  </h3>
                  <p className="text-white/40 text-sm leading-[2] font-medium max-w-xl">
                    {car.description || "Profitez d'une expérience de conduite exceptionnelle avec ce modèle premium. Sécurité, performance et confort absolu réunis pour vos trajets les plus prestigieux."}
                  </p>
               </div>
               
               <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-8">
                  <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-6">Services Inclus</h3>
                  {[
                    "Assistance routière 24/7",
                    "Kilométrage illimité",
                    "Nettoyage premium inclus",
                    "Transfert possible l'Aéroport"
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <CheckCircle2 size={16} className="text-primary" />
                       <span className="text-white/60 text-xs font-black uppercase tracking-widest">{service}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Booking Summary Sidebar (R: 4/12) - RealRent Style */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                
                <h2 className="text-2xl font-display font-black text-dark uppercase mb-10 flex items-center gap-4">
                   <Calendar size={20} className="text-primary" /> Booking Summary
                </h2>

                <div className="space-y-8">
                   {/* Inputs for summary adjustment */}
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">Prise en charge</label>
                         <input 
                           type="text" 
                           className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-black text-dark rounded-xl focus:outline-none"
                           value={bookingData.pickup}
                           onChange={e => setBookingData({...bookingData, pickup: e.target.value})}
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">Départ</label>
                            <input 
                              type="date" 
                              className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-black text-dark rounded-xl focus:outline-none"
                              value={bookingData.startDate}
                              onChange={e => setBookingData({...bookingData, startDate: e.target.value})}
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black">Retour</label>
                            <input 
                              type="date" 
                              className="w-full bg-gray-50 border border-gray-100 p-4 text-xs font-black text-dark rounded-xl focus:outline-none"
                              value={bookingData.endDate}
                              onChange={e => setBookingData({...bookingData, endDate: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>

                   {/* Price Calculation (RealRent Style) */}
                   <div className="pt-8 border-t border-gray-100 space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                         <span>Durée de location</span>
                         <span className="text-dark font-black">{rentalStats.days} Jours</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                         <span>Tarif journalier</span>
                         <span className="text-dark font-black">${car.price_per_day}</span>
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                         <span className="text-sm font-black uppercase tracking-[0.2em] text-dark">Total</span>
                         <span className="text-3xl font-display font-black text-primary">${rentalStats.total}</span>
                      </div>
                   </div>

                   <Button 
                    onClick={handleWhatsAppBooking}
                    className="w-full h-16 bg-dark text-white rounded-2xl flex items-center justify-center gap-3 font-black tracking-[0.4em] text-[10px] hover:bg-primary transition-all duration-500 shadow-xl shadow-primary/20"
                   >
                     <MessageCircle size={18} className="text-primary" />
                     BOOK NOW
                   </Button>
                </div>

                <div className="mt-8 text-center">
                   <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Confirmation via Professional WhatsApp Concierge</p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-dark p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all" />
                 <h4 className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">Assistance HQ</h4>
                 <p className="text-white/40 text-[11px] font-medium leading-relaxed mb-8">Questions sur ce véhicule ? Contactez nos experts.</p>
                 <Link href="/contact" className="text-white text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/10 hover:border-primary transition-all">Support Direct</Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default function CarDetailsClient(props: CarDetailsClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark pt-48 text-center text-primary font-black uppercase tracking-[0.5em] animate-pulse">Chargement de l'actif...</div>}>
      <CarDetailsContent {...props} />
    </Suspense>
  );
}
