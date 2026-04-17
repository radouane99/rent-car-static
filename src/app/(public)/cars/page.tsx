"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { SearchSection } from "@/components/home/SearchSection";
import { CarCard, type Car } from "@/components/cars/CarCard";
import { Filter, ChevronDown, CheckCircle2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom cross-version SVG for reliability
const SlidersIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="12" x2="14" y2="12"/><line x1="18" y1="16" x2="22" y2="16"/>
  </svg>
);

function CarsContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [searchTerm, setSearchTerm] = useState("");

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
        
        // Front-end filtering for search term
        const filtered = searchTerm 
          ? carList.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
          : carList;

        setCars(filtered);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [category, searchTerm]);

  return (
    <div className="pt-40 pb-32 min-h-screen bg-[#F9FAFB]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Filters (RealRent Style) */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm sticky top-32">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-50 text-dark">
                <SlidersIcon size={20} />
                <h3 className="text-[12px] uppercase tracking-[0.4em] font-black">Filtres</h3>
              </div>

              <div className="space-y-12">
                {/* Text Search */}
                <div>
                   <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-4 block">Recherche</label>
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                      <input 
                        type="text"
                        placeholder="Par marque, modèle..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-12 py-4 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-white transition-all"
                      />
                      {searchTerm && (
                        <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-dark">
                          <X size={14} />
                        </button>
                      )}
                   </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-4 block">Catégorie</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["All", "Supercar", "Luxury", "Sport", "SUV"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] border transition-all duration-300 rounded-xl text-left flex justify-between items-center group",
                          category === cat 
                            ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                            : "bg-gray-50 border-gray-100 text-gray-500 hover:border-primary/30 hover:bg-white"
                        )}
                      >
                        {cat}
                        <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", category === cat ? "opacity-100" : "opacity-0")} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance / Sort */}
                <div>
                   <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-4 block">Trier par</label>
                   <div className="relative">
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-5 text-xs font-black text-gray-700 focus:outline-none appearance-none cursor-pointer hover:bg-white transition-all uppercase tracking-widest">
                        <option>Prix: Croissant</option>
                        <option>Prix: Décroissant</option>
                        <option>Performance</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   </div>
                </div>

                <div className="pt-8 border-t border-gray-50">
                   <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      <CheckCircle2 size={16} className="text-primary" />
                      Confirmation Immédiate
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
               <p className="text-primary font-black text-[11px] uppercase tracking-[0.4em] mb-6 relative z-10">24/7 Concierge</p>
               <p className="text-white/40 text-[12px] mb-10 leading-relaxed font-medium">Bésoin d'aide ? Notre équipe est prête à vous assister.</p>
               <button className="w-full py-5 text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 rounded-xl hover:bg-white hover:text-dark transition-all duration-500 relative z-10">
                  Contactez-nous
               </button>
            </div>
          </aside>

          {/* Grid Area */}
          <div className="lg:w-3/4">
             {/* Header Info (RealRent Style) */}
             <div className="bg-white border border-gray-100 rounded-[2rem] p-10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div>
                   <h2 className="text-3xl font-display font-black text-dark uppercase tracking-tight">
                      {cars.length} Véhicules <span className="text-primary">Disponibles</span>
                   </h2>
                   <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-black mt-2">
                      Affichage de tous les modèles Premium
                   </p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Page 1 of 1</span>
                </div>
             </div>

             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {[1, 2, 3, 4].map(i => <div key={i} className="bg-white/50 border border-gray-100 aspect-[16/11] rounded-[2rem] animate-pulse" />)}
                </div>
             ) : cars.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {cars.map(car => (
                   <CarCard key={car.id} car={car} />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-40 bg-white border border-gray-100 rounded-[3rem] shadow-sm">
                 <div className="p-10 bg-gray-50 rounded-full mb-10">
                    <Filter size={60} className="text-gray-200" />
                 </div>
                 <p className="text-dark font-black uppercase tracking-[0.5em] mb-4 text-sm">Aucun véhicule trouvé</p>
                 <p className="text-gray-400 text-sm font-medium">Essayez de modifier vos filtres de recherche.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="pt-48 text-center text-primary font-black uppercase tracking-[0.5em] animate-pulse">Chargement de la collection...</div>}>
      <CarsContent />
    </Suspense>
  );
}
