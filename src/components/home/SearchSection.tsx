"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function SearchSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    startDate: "",
    endDate: "",
    startTime: "10:00",
    endTime: "10:00",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/cars?${query}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-20 px-6">
      <form 
        onSubmit={handleSearch}
        className="bg-black/80 backdrop-blur-3xl p-1 md:p-1 border border-white/5 grid grid-cols-1 md:grid-cols-5 gap-0 items-stretch shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Location */}
        <div className="group space-y-2 p-6 border-r border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <label className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black flex items-center gap-3">
            <MapPin size={10} className="text-primary" /> Departure Point
          </label>
          <input 
            type="text" 
            placeholder="City or Airport"
            className="bg-transparent border-none text-white text-[13px] font-bold focus:outline-none w-full placeholder:text-white/10 mt-2"
            required
            value={formData.pickup}
            onChange={(e) => setFormData({...formData, pickup: e.target.value})}
          />
        </div>

        {/* Dropoff */}
        <div className="group space-y-2 p-6 border-r border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <label className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black flex items-center gap-3">
            <MapPin size={10} className="text-primary" /> Arrival Point
          </label>
          <input 
            type="text" 
            placeholder="Exclusive Drop-off"
            className="bg-transparent border-none text-white text-[13px] font-bold focus:outline-none w-full placeholder:text-white/10 mt-2"
            value={formData.dropoff}
            onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
          />
        </div>

        {/* Start Date & Time */}
        <div className="group space-y-2 p-6 border-r border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <label className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black flex items-center gap-3">
            <Calendar size={10} className="text-primary" /> Activation Date
          </label>
          <div className="flex gap-2 mt-2">
            <input 
              type="date" 
              className="bg-transparent border-none text-white text-[11px] font-bold focus:outline-none w-full [color-scheme:dark]"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="group space-y-2 p-6 border-r border-white/5 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          <label className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black flex items-center gap-3">
            <Calendar size={10} className="text-primary" /> Deactivation
          </label>
          <div className="flex gap-2 mt-2">
            <input 
              type="date" 
              className="bg-transparent border-none text-white text-[11px] font-bold focus:outline-none w-full [color-scheme:dark]"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="relative group overflow-hidden">
          <Button type="submit" className="w-full h-full bg-primary text-black rounded-none flex flex-col items-center justify-center gap-2 font-black tracking-[0.3em] text-[10px] hover:bg-white transition-colors duration-500">
            <Search size={16} />
            SCAN FLEET
          </Button>
        </div>
      </form>
    </div>
  );
}
