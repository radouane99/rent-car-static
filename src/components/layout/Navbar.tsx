"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Car } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/cars" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="text-primary w-8 h-8" />
          <span className="text-2xl font-display font-bold track-widest uppercase">
            Lux<span className="text-primary">Drive</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest hover:text-primary transition-colors",
                pathname === link.href ? "text-primary font-bold" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button size="sm" onClick={() => (window.location.href = "/cars")}>
            Book Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 right-0 border-b border-white/10 flex flex-col items-center py-8 space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg uppercase tracking-widest",
                pathname === link.href ? "text-primary font-bold" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button onClick={() => (window.location.href = "/cars")}>Book Now</Button>
        </div>
      )}
    </nav>
  );
}
