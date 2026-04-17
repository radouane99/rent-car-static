"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Star, Quote } from "lucide-react";
import { useTranslation } from "@/lib/LanguageContext";

const REVIEWS = [
  {
    name: "Youssef B.",
    role: "Entrepreneur",
    content: { en: "The best luxury car rental experience I've ever had. Truly professional service and the vehicle was in pristine condition.", fr: "La meilleure expérience de location de voiture de luxe que j'ai jamais eue. Un service vraiment professionnel et le véhicule était en parfait état." },
    rating: 5
  },
  {
    name: "Sarah M.",
    role: "Architecte",
    content: { en: "Benadada provides a level of service that matches the quality of their cars. The booking was seamless and the car was flawless.", fr: "Benadada offre un niveau de service à la hauteur de la qualité de ses voitures. La réservation a été simple et la voiture impeccable." },
    rating: 5
  },
  {
    name: "Karim A.",
    role: "Directeur Commercial",
    content: { en: "Quick, discreet, and high-quality. The booking process was seamless. I'll definitely be back for my next business trip.", fr: "Rapide, discret et de haute qualité. Le processus de réservation était fluide. Je reviendrai sans hésiter pour mon prochain voyage d'affaires." },
    rating: 5
  }
];

export function Testimonials() {
  const { locale, t } = useTranslation();

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{t("testimonials.subtitle")}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 uppercase">
            {t("testimonials.title1")} <span className="text-gold-gradient">{t("testimonials.title2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <GlassCard key={i} className="flex flex-col">
              <Quote className="text-primary/20 mb-6" size={40} />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">"{review.content[locale]}"</p>
              <div className="mt-auto">
                <p className="text-gray-800 font-bold uppercase text-sm tracking-widest">{review.name}</p>
                <p className="text-primary/60 text-[10px] uppercase font-bold">{review.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
