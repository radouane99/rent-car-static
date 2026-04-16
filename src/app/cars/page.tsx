"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { SearchSection } from "@/components/home/SearchSection";
import { CarCard, type Car } from "@/components/cars/CarCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function CarsContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, "cars"));
        
        if (category !== "All") {
          q = query(collection(db, "cars"), where("category", "==", category));
        }

        const querySnapshot = await getDocs(q);
        const carList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
        setCars(carList);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [category]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-12">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">World-Class Fleet</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic mb-8">
            Select Your <span className="text-gold-gradient">Masterpiece</span>
          </h1>
          <SearchSection />
        </header>

        <div className="flex flex-col lg:flex-row gap-12 mt-20">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-8">
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="text-sm uppercase tracking-widest font-bold text-white">Refine Search</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Supercar", "Luxury", "Sport", "SUV"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "px-4 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300",
                          category === cat 
                            ? "bg-primary text-dark border-primary font-bold" 
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Sort By High Performance</label>
                   <div className="relative">
                      <select className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer">
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Top Speed</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                   </div>
                </div>
              </div>
            </GlassCard>
            
            <div className="glass p-8 rounded-sm text-center">
               <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">Support 24/7</p>
               <p className="text-white/60 text-[10px] mb-6">Our concierge is ready to assist you anytime.</p>
               <button className="text-white text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors">Contact Now</button>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:w-3/4">
             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[1, 2, 3, 4].map(i => <div key={i} className="glass aspect-video animate-pulse" />)}
                </div>
             ) : cars.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {cars.map(car => (
                   <CarCard key={car.id} car={car} />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-sm">
                 <Filter size={48} className="text-white/10 mb-6" />
                 <p className="text-white font-bold uppercase tracking-widest mb-2">No Cars Found</p>
                 <p className="text-white/40 text-sm">Try adjusting your filters or search criteria.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-primary font-bold uppercase tracking-[0.5em] animate-pulse">Loading Universe...</div>}>
      <CarsContent />
    </Suspense>
  );
}
