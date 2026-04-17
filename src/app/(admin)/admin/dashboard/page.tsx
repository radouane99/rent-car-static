"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Users, Car, FileText, DollarSign, 
  TrendingUp, Activity, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalPosts: 0,
    activeReservations: 12, // Mock for now until reservation system is fully hooked
  });
  const [recentCars, setRecentCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsSnap = await getDocs(collection(db, "cars"));
        const postsSnap = await getDocs(collection(db, "posts"));
        
        const carsData = carsSnap.docs.map(doc => doc.data());
        
        setStats({
          totalCars: carsSnap.size,
          availableCars: carsData.filter(c => c.available).length,
          totalPosts: postsSnap.size,
          activeReservations: 12,
        });

        // Get 3 most recently added cars
        const recentQ = query(collection(db, "cars"), orderBy("createdAt", "desc"), limit(3));
        const recentSnap = await getDocs(recentQ);
        setRecentCars(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Fleet Intelligence", value: stats.totalCars, sub: `${stats.availableCars} Active`, icon: Car, color: "text-primary" },
    { label: "Engagement Hub", value: stats.totalPosts, sub: "Published Articles", icon: FileText, color: "text-blue-400" },
    { label: "Operational Load", value: stats.activeReservations, sub: "Pending Verification", icon: Activity, color: "text-green-500" },
    { label: "Market Strength", value: "$45.2k", sub: "+12% Growth", icon: DollarSign, color: "text-gold-light" },
  ];

  if (loading) return <div className="h-96 flex items-center justify-center text-primary uppercase text-[10px] font-bold tracking-[0.5em] animate-pulse">Syncing Global Data...</div>;

  return (
    <div className="space-y-12">
      <header>
        <div className="flex items-center gap-3 mb-4">
           <div className="h-[1px] w-8 bg-primary" />
           <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Administrative Hub</span>
        </div>
        <h1 className="text-5xl font-display font-black text-gray-900 uppercase tracking-tighter">
           System <span className="text-primary">Command</span>
        </h1>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Overseeing global assets and content distribution.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <GlassCard key={i} className="p-8 border-gray-200 bg-white group hover:border-primary/40 hover:shadow-lg transition-all shadow-sm">
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-sm group-hover:bg-primary/10 transition-colors border border-gray-100 group-hover:border-primary/20">
                   <stat.icon size={22} className={cn(stat.color)} />
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                   Live Status
                </div>
             </div>
             <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-black mb-1">{stat.label}</p>
             <div className="flex items-baseline gap-3">
                <h3 className="text-4xl font-display font-black text-gray-900">{stat.value}</h3>
                <span className="text-[10px] text-gray-400 uppercase font-bold">{stat.sub}</span>
             </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <GlassCard className="p-10 border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
               <h3 className="text-gray-800 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3">
                 <Clock size={16} className="text-primary" /> Recent Deployment Activity
               </h3>
               <button className="text-[9px] text-primary uppercase font-black hover:underline tracking-widest">View Archives</button>
            </div>
            
            <div className="space-y-8">
              {recentCars.length > 0 ? recentCars.map((car) => (
                <div key={car.id} className="flex justify-between items-center group">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gray-100 overflow-hidden rounded-sm border border-gray-200 group-hover:border-primary/50 transition-colors">
                        <img src={car.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-black uppercase text-sm tracking-tight">{car.name}</p>
                        <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-bold">Category: {car.category}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-gray-900 font-bold text-sm tracking-tighter">${car.price_per_day}</p>
                      <p className={cn("text-[8px] uppercase font-black tracking-widest", car.available ? "text-primary" : "text-gray-400")}>
                        {car.available ? "Ready for Action" : "Currently Deployed"}
                      </p>
                   </div>
                </div>
              )) : (
                <p className="text-gray-400 uppercase text-[10px] tracking-widest text-center py-10">No recent deployment records found.</p>
              )}
            </div>
         </GlassCard>

         <GlassCard className="p-10 border-gray-200 bg-white shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
               <h3 className="text-gray-800 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3">
                 <TrendingUp size={16} className="text-primary" /> System Utilization
               </h3>
            </div>
            
            <div className="space-y-6">
               {[
                 { label: "Database Latency", val: "14ms", status: "Optimal" },
                 { label: "Content Propagation", val: "Global", status: "Synced" },
                 { label: "Storage Capacity", val: "2.4GB / 5GB", status: "Healthy" },
                 { label: "Uptime Protocol", val: "99.98%", status: "Stable" },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center py-2">
                    <div className="flex flex-col">
                       <span className="text-gray-900 font-bold text-xs uppercase tracking-wider">{item.label}</span>
                       <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{item.val}</span>
                    </div>
                    <span className="bg-primary/10 text-primary text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest">{item.status}</span>
                 </div>
               ))}
            </div>

            <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-sm text-center">
                <p className="text-primary font-black uppercase tracking-[0.3em] text-[15px] mb-2">Benadada Cloud</p>
                <p className="text-gray-500 text-[9px] uppercase font-bold">All systems reporting optimal operational efficiency.</p>
            </div>
         </GlassCard>
      </div>
    </div>
  );
}
