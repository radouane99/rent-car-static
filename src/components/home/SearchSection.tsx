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
    <div className="w-full max-w-6xl mx-auto -mt-20 relative z-20 px-6">
      <form 
        onSubmit={handleSearch}
        className="glass p-2 md:p-3 rounded-sm grid grid-cols-1 md:grid-cols-5 gap-2 items-end shadow-2xl"
      >
        {/* Location */}
        <div className="space-y-2 p-3 border-r border-white/5 last:border-0">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <MapPin size={12} /> Pickup Location
          </label>
          <input 
            type="text" 
            placeholder="City or Airport"
            className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder:text-white/20"
            required
            value={formData.pickup}
            onChange={(e) => setFormData({...formData, pickup: e.target.value})}
          />
        </div>

        {/* Dropoff */}
        <div className="space-y-2 p-3 border-r border-white/5 last:border-0">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <MapPin size={12} /> Drop-off
          </label>
          <input 
            type="text" 
            placeholder="Same as pickup"
            className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder:text-white/20"
            value={formData.dropoff}
            onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
          />
        </div>

        {/* Start Date & Time */}
        <div className="space-y-2 p-3 border-r border-white/5 last:border-0">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <Calendar size={12} /> Pick-up Date
          </label>
          <div className="flex gap-2">
            <input 
              type="date" 
              className="bg-transparent border-none text-white text-xs focus:outline-none w-full [color-scheme:dark]"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
            <input 
              type="time" 
              className="bg-transparent border-none text-white text-xs focus:outline-none [color-scheme:dark]"
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="space-y-2 p-3 border-r border-white/5 last:border-0">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <Calendar size={12} /> Return Date
          </label>
          <div className="flex gap-2">
            <input 
              type="date" 
              className="bg-transparent border-none text-white text-xs focus:outline-none w-full [color-scheme:dark]"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
            <input 
              type="time" 
              className="bg-transparent border-none text-white text-xs focus:outline-none [color-scheme:dark]"
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="p-2">
          <Button type="submit" className="w-full h-14 md:h-full flex items-center gap-3">
            <Search size={18} />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
