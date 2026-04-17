"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="relative w-48 h-12 mb-8">
            <Image 
              src="/logo_benadada.png" 
              alt="Benadada Cars" 
              fill
              className="object-contain brightness-110"
            />
          </div>
          <p className="text-white/40 text-[11px] leading-[2] uppercase tracking-wider font-medium max-w-sm">
            Service de location de voitures premium fournissant des véhicules de luxe et fiables pour tous vos besoins de transport avec un service client exceptionnel.
          </p>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-10 flex items-center gap-3">
             <div className="w-4 h-[1px] bg-primary" /> Services
          </h4>
          <ul className="space-y-5">
            {[
              { name: "Location de voitures de luxe", href: "/cars" },
              { name: "Location longue durée", href: "/cars" },
              { name: "Solutions d'entreprise", href: "/contact" },
              { name: "Transferts aéroport", href: "/cars" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-all font-black hover:pl-2">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-10 flex items-center gap-3">
             <div className="w-4 h-[1px] bg-primary" /> Support
          </h4>
          <ul className="space-y-5">
            {[
              { name: "Nous contacter", href: "/contact" },
              { name: "Centre d'aide", href: "/contact" },
              { name: "Conditions générales", href: "/contact" },
              { name: "Politique de confidentialité", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-all font-black hover:pl-2">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordonnées Column */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-10 flex items-center gap-3">
             <div className="w-4 h-[1px] bg-primary" /> Coordonnées
          </h4>
          <ul className="space-y-8">
            <li className="flex items-center space-x-4 group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-primary transition-all duration-500">
                <Phone size={14} className="text-primary group-hover:text-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-[10px] uppercase tracking-widest font-black transition-colors">+212 600-000000</span>
                <span className="text-white/20 text-[8px] uppercase font-bold tracking-widest">Lundi - Dimanche : 24h/24</span>
              </div>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-primary transition-all duration-500">
                <Mail size={14} className="text-primary group-hover:text-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-[10px] uppercase tracking-widest font-black transition-colors">contact@benadadacars.com</span>
                <span className="text-white/20 text-[8px] uppercase font-bold tracking-widest">Réponse en moins de 15min</span>
              </div>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-primary transition-all duration-500">
                <MapPin size={14} className="text-primary group-hover:text-dark" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-[10px] uppercase tracking-widest font-black transition-colors">Fès Center, Morocco</span>
                <span className="text-white/20 text-[8px] uppercase font-bold tracking-widest">Base HQ (Centre Ville)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-black">
          &copy; {new Date().getFullYear()} Benadada Cars • Realised with Elite Standards
        </p>
        <div className="flex space-x-8">
          {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
            <a key={i} href="#" className="text-white/20 hover:text-white transition-all transform hover:scale-125 hover:rotate-6">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
