import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark/80 backdrop-blur-xl border-t border-primary/10 pt-24 pb-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="relative w-48 h-12 mb-8">
            <Image 
              src="/logo_benadada.png" 
              alt="Benadada Cars" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-wider">
            Curating the world's most exclusive automotive experiences. From elite supercars to professional chauffeur services, we define luxury on the road.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8 font-display italic">Showcase</h4>
          <ul className="space-y-4">
            {["The Fleet", "VIP Services", "Memberships", "Special Requests"].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-primary text-[10px] uppercase tracking-widest transition-colors font-bold">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8 font-display italic">Protocol</h4>
           <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Safety Protocols", "FAQ"].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-primary text-[10px] uppercase tracking-widest transition-colors font-bold">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8 font-display italic">Base Command</h4>
          <ul className="space-y-6">
            <li className="flex items-center space-x-4 group">
              <div className="p-3 glass rounded-full group-hover:bg-primary/10 transition-colors">
                <Phone size={14} className="text-primary" />
              </div>
              <span className="text-white/70 text-[10px] uppercase tracking-widest font-black transition-colors group-hover:text-white">+212 600-000000</span>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="p-3 glass rounded-full group-hover:bg-primary/10 transition-colors">
                <MapPin size={14} className="text-primary" />
              </div>
              <span className="text-white/70 text-[10px] uppercase tracking-widest font-black transition-colors group-hover:text-white">Casablanca, Morocco</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} Benadada Cars • Engineered for Excellence</p>
        <div className="flex space-x-8">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="text-white/20 hover:text-primary transition-all hover:scale-110">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
