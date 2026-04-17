"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/LanguageContext";

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();

  const navLinks = [
    { name: t("nav.fleet") || "Flotte", href: "/cars" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = (newLocale: string) => setLocale(newLocale);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled 
          ? "bg-dark/95 backdrop-blur-2xl py-3 border-b border-white/5 shadow-2xl" 
          : "bg-dark py-5 shadow-lg border-b border-white/5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="relative w-44 h-12 md:w-56 md:h-14 transition-transform group-hover:scale-105 duration-500">
            <Image 
              src="/logo_benadada.png" 
              alt="Benadada Cars" 
              fill
              className="object-contain filter brightness-110"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] uppercase tracking-[0.4em] font-black transition-all hover:text-primary relative group",
                  pathname === link.href ? "text-primary" : "text-white/70"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[1.5px] bg-primary transition-transform duration-500",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
             {/* Language Toggle - RealRent Style */}
             <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => toggleLang("fr")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all",
                    locale === "fr" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"
                  )}
                >
                  FR
                </button>
                <button 
                  onClick={() => toggleLang("en")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all",
                    locale === "en" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"
                  )}
                >
                  EN
                </button>
             </div>

             <Link 
               href="/admin/dashboard" 
               className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-dark transition-all duration-300 group"
             >
                <GridIcon />
                Tableau de bord
             </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white/80 transition-colors hover:text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-dark/98 backdrop-blur-2xl absolute top-full left-0 right-0 border-b border-white/5 flex flex-col items-center py-12 space-y-8 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-xs uppercase tracking-[0.5em] font-black",
                pathname === link.href ? "text-primary" : "text-white/60"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-4">
             <button onClick={() => toggleLang("fr")} className={cn("text-[10px] font-black", locale === "fr" ? "text-primary" : "text-white/40")}>FR</button>
             <button onClick={() => toggleLang("en")} className={cn("text-[10px] font-black", locale === "en" ? "text-primary" : "text-white/40")}>EN</button>
          </div>
          <Button className="w-64 h-12" onClick={() => (window.location.href = "/cars")}>Réserver</Button>
        </div>
      )}
    </nav>
  );
}
