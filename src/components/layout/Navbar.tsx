"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Fleet Showcase", href: "/cars" },
  { name: "Content Studio", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-black/90 backdrop-blur-xl py-3 border-b border-primary/20 shadow-[0_0_30px_rgba(197,160,89,0.1)]" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group relative">
          <div className="relative w-40 h-12 md:w-56 md:h-16 transition-transform group-hover:scale-105 duration-500">
            <Image 
              src="/logo_benadada.png" 
              alt="Luxury Location Voiture - Benadada Cars" 
              fill
              className="object-contain filter drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] font-black transition-all hover:text-primary relative overflow-hidden group",
                pathname === link.href ? "text-primary" : "text-white/60"
              )}
            >
              <span className="relative z-10">{link.name}</span>
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[1px] bg-primary transition-transform duration-500",
                pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </Link>
          ))}
          
          <div className="flex items-center space-x-4">
             <Link href="/admin/dashboard" className="p-2 text-white/20 hover:text-primary transition-colors" title="Admin Control">
                <ShieldCheck size={18} />
             </Link>
             <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10 tracking-[0.2em] text-[9px]" onClick={() => (window.location.href = "/cars")}>
                SECURE BOOKING
             </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white/50 hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-2xl absolute top-full left-0 right-0 border-b border-primary/10 flex flex-col items-center py-12 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          {navLinks.map((link) => (
            <Link
              key={link.name}
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
          <Button className="w-64" onClick={() => (window.location.href = "/cars")}>SECURE BOOKING</Button>
          <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Command Center</Link>
        </div>
      )}
    </nav>
  );
}
