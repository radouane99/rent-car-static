import { GlassCard } from "@/components/ui/GlassCard";
import { Users, Car, Heart, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Fleet", value: "24", icon: Car, change: "+2 this month" },
    { label: "Active Bookings", value: "12", icon: Users, change: "85% occupancy" },
    { label: "Revenue", value: "$45,200", icon: DollarSign, change: "+12.5% vs last month" },
    { label: "Favorites", value: "1.2k", icon: Heart, change: "Trending #1" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">
           System <span className="text-primary">Overview</span>
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Welcome back. System is operational.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-8">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 rounded-sm">
                   <stat.icon size={20} className="text-primary" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase">
                   <TrendingUp size={12} /> {stat.change}
                </div>
             </div>
             <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</p>
             <h3 className="text-3xl font-display font-black text-white">{stat.value}</h3>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <GlassCard className="p-8">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-b border-white/5 pb-4">Recent Reservation Hooks</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-full" />
                      <div>
                        <p className="text-white font-bold uppercase italic">Lamborghini Huracán</p>
                        <p className="text-white/30 text-[9px] uppercase tracking-widest">Client ID: #882{i}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-primary font-bold">$1,200</p>
                      <p className="text-white/20 text-[9px] uppercase tracking-tighter">CONFIRMED</p>
                   </div>
                </div>
              ))}
            </div>
         </GlassCard>

         <GlassCard className="p-8">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 border-b border-white/5 pb-4">Active Fleet Status</h3>
            <div className="space-y-4">
               {[
                 { name: "Rolls-Royce Ghost", status: "In Use", color: "text-blue-400" },
                 { name: "Bentley GT", status: "Ready", color: "text-green-500" },
                 { name: "Ferrari F8", status: "Maintenance", color: "text-red-500" },
               ].map((car, i) => (
                 <div key={i} className="flex justify-between items-center">
                    <span className="text-white/60 text-xs uppercase font-bold">{car.name}</span>
                    <span className={cn("text-[10px] uppercase font-black tracking-widest", car.color)}>{car.status}</span>
                 </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
}
