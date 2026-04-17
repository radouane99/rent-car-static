"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, MapPin, Search, Plane, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

const LOCATIONS = [
  { group: "Aéroports Marocains", items: [
    "Aéroport Casablanca - Mohammed V (CMN)",
    "Aéroport Marrakech - Menara (RAK)",
    "Aéroport Fès - Saïss (FES)",
    "Aéroport Agadir - Al Massira (AGA)",
    "Aéroport Tanger - Ibn Battouta (TNG)",
    "Aéroport Rabat - Salé (RBA)",
    "Aéroport Nador - Al Aroui (NDR)",
    "Aéroport Oujda - Angads (OUD)",
    "Aéroport Laayoune - Hassan I (EUN)",
    "Aéroport Dakhla (VIL)",
    "Aéroport Ouarzazate (OZZ)",
    "Aéroport Al Hoceima - Cherif Al Idrissi (AHU)",
    "Aéroport Errachidia - Moulay Ali Cherif (ERH)",
    "Aéroport Essaouira - Mogador (ESU)",
    "Aéroport Guelmim (GLN)",
    "Aéroport Tan-Tan - Plage Blanche (TTA)",
    "Aéroport Tétouan - Sania Ramel (TTU)",
  ]},
  { group: "Principaux Centres Villes", items: [
    "Fès Centre Ville (Base HQ)",
    "Casablanca Centre Ville",
    "Marrakech Centre Ville",
    "Rabat Centre Ville",
    "Tanger Centre Ville",
    "Agadir Centre Ville",
    "Meknès Centre Ville",
    "Oujda Centre Ville",
    "Kenitra Centre Ville",
    "Tétouan Centre Ville",
    "Safi Centre Ville",
    "El Jadida Centre Ville",
    "Béni Mellal Centre Ville",
    "Mohammédia Centre Ville",
    "Taza Centre Ville",
    "Nador Centre Ville",
    "Khouribga Centre Ville",
    "Settat Centre Ville",
    "Ksar El Kebir Centre Ville",
    "Larache Centre Ville",
    "Guelmim Centre Ville",
    "Berrechid Centre Ville",
    "Oued Zem Centre Ville",
    "Fquih Ben Salah Centre Ville",
    "Taourirt Centre Ville",
    "Berkane Centre Ville",
    "Sidi Slimane Centre Ville",
    "Sidi Kacem Centre Ville",
    "Khenifra Centre Ville",
    "Tifelt Centre Ville",
    "Essaouira Centre Ville",
    "Taroudant Centre Ville",
    "Ouarzazate Centre Ville",
    "Dakhla Centre Ville",
    "Laayoune Centre Ville",
  ]}
];

interface SearchSectionProps {
  className?: string;
  isHero?: boolean;
}

function SearchSectionContent({ className, isHero = false }: SearchSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    pickup: searchParams.get("pickup") || "",
    dropoff: searchParams.get("dropoff") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });

  const [showPickupList, setShowPickupList] = useState(false);
  const [showDropoffList, setShowDropoffList] = useState(false);

  // Sync state with URL params when they change
  useEffect(() => {
    setFormData({
      pickup: searchParams.get("pickup") || "",
      dropoff: searchParams.get("dropoff") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
    });
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/cars?${query}`);
  };

  const LocationDropdown = ({ 
    value, 
    onChange, 
    isOpen, 
    setIsOpen, 
    placeholder,
    icon: Icon 
  }: { 
    value: string, 
    onChange: (val: string) => void, 
    isOpen: boolean, 
    setIsOpen: (val: boolean) => void,
    placeholder: string,
    icon: any
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    return (
      <div className="relative w-full" ref={dropdownRef}>
         <div 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex flex-col p-4 md:p-6 transition-all duration-300 cursor-pointer border-r border-gray-100 group relative",
            isOpen ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 rounded-xl md:rounded-l-2xl border-transparent" : "hover:bg-gray-50/50"
          )}
        >
          <div className={cn(
            "absolute top-0 left-0 w-full h-[2px] bg-primary transition-transform origin-left duration-500",
            isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )} />
          
          <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 mb-1 flex items-center gap-2">
            <Icon size={12} className="text-primary" />
            {placeholder}
          </label>
          
          <div className="flex items-center justify-between gap-2">
             <input 
              readOnly
              value={value || "Choisir..."}
              className="bg-transparent border-none text-[13px] font-bold text-gray-800 focus:outline-none w-full cursor-pointer placeholder:text-gray-300"
            />
            <ChevronDown size={14} className={cn("text-gray-300 transition-transform duration-300", isOpen && "rotate-180")} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-[300px] md:w-[420px] bg-white border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-2xl z-[100] py-4 max-h-[460px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {LOCATIONS.map((group) => (
              <div key={group.group} className="mb-6 last:mb-0">
                <div className="px-6 py-2 flex items-center gap-3 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    {group.group.includes("Aéroports") ? <Plane size={12} className="text-primary" /> : <Building2 size={12} className="text-primary" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">{group.group}</span>
                </div>
                <div className="mt-1">
                  {group.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(item);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-8 py-3.5 text-[12px] font-bold text-gray-700 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group/item border-l-4 border-transparent hover:border-primary"
                    >
                      {item}
                      <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover/item:scale-100 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto relative z-[60]", isHero && "-mt-16 px-6", className)}>
      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-2xl p-1.5 border border-gray-100 flex flex-col md:flex-row items-stretch shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
      >
        <LocationDropdown 
          value={formData.pickup}
          onChange={(val) => setFormData({...formData, pickup: val})}
          isOpen={showPickupList}
          setIsOpen={setShowPickupList}
          placeholder={t("search.pickup")}
          icon={MapPin}
        />

        <LocationDropdown 
          value={formData.dropoff}
          onChange={(val) => setFormData({...formData, dropoff: val})}
          isOpen={showDropoffList}
          setIsOpen={setShowDropoffList}
          placeholder={t("search.dropoff")}
          icon={MapPin}
        />

        <div className="group flex flex-col p-4 md:p-6 transition-all duration-300 border-r border-gray-100 hover:bg-gray-50/50 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 mb-1 flex items-center gap-2">
            <Calendar size={12} className="text-primary" />
            {t("search.startDate")}
          </label>
          <input 
            type="date" 
            className="bg-transparent border-none text-gray-800 text-[13px] font-bold focus:outline-none w-full mt-1 cursor-pointer"
            required
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
        </div>

        <div className="group flex flex-col p-4 md:p-6 transition-all duration-300 border-r border-gray-100 hover:bg-gray-50/50 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 mb-1 flex items-center gap-2">
            <Calendar size={12} className="text-primary" />
            {t("search.endDate")}
          </label>
          <input 
            type="date" 
            className="bg-transparent border-none text-gray-800 text-[13px] font-bold focus:outline-none w-full mt-1 cursor-pointer"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
        </div>

        <div className="relative group overflow-hidden md:flex-grow">
          <Button type="submit" className="w-full h-full min-h-[70px] bg-primary text-white rounded-none md:rounded-r-2xl flex flex-col md:flex-row items-center justify-center gap-3 font-black tracking-[0.4em] text-[11px] hover:bg-primary-dark transition-all duration-500 group-hover:scale-[1.02] shadow-xl shadow-primary/20">
            <Search size={22} />
            {t("search.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function SearchSection(props: SearchSectionProps) {
  return (
    <Suspense fallback={<div className="h-20 bg-white rounded-2xl animate-pulse" />}>
      <SearchSectionContent {...props} />
    </Suspense>
  );
}
