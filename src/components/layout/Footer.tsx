import Link from "next/link";
import { Car, Phone, Mail, MapPin, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="text-primary w-8 h-8" />
            <span className="text-2xl font-display font-bold track-widest uppercase">
              Lux<span className="text-primary">Drive</span>
            </span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Ultimate luxury car rental service. Experience precision, performance, and prestige. 
            Your gateway to the world's most exclusive automotive icons.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 glass rounded-sm hover:scale-110 transition-transform">
              <Share2 size={18} className="text-primary" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-primary font-bold uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li><Link href="/cars" className="hover:text-primary">Our Fleet</Link></li>
            <li><Link href="/services" className="hover:text-primary">VIP Services</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Luxury Guide</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-primary font-bold uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-primary" />
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-primary" />
              <span>concierge@luxdrive.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={16} className="text-primary" />
              <span>Beverly Hills, CA 90210</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-primary font-bold uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-xs text-white/50 mb-4 uppercase tracking-tighter">Get exclusive offers & updates</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-full"
            />
            <button className="bg-primary text-dark px-4 py-2 text-xs font-bold uppercase tracking-widest">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs uppercase tracking-widest">
          © 2026 LuxDrive International. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
