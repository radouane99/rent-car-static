import { GlassCard } from "@/components/ui/GlassCard";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "James Wilson",
    role: "CEO, Tech Corp",
    content: "The best luxury car rental experience I've ever had. Truly professional service and the Lamborghini was in pristine condition.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Fashion Designer",
    content: "LuxDrive provides a level of service that matches the quality of their cars. I rented a Rolls-Royce for my show and it was flawless.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Entrepreneur",
    content: "Quick, discreet, and high-quality. The booking process was seamless. I'll definitely be back for my next business trip.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-dark relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Reputation</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase italic">
            What Our <span className="text-gold-gradient">Clients Say</span>
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
              <p className="text-white/70 italic mb-8 leading-relaxed">"{review.content}"</p>
              <div className="mt-auto">
                <p className="text-white font-bold uppercase text-sm tracking-widest">{review.name}</p>
                <p className="text-primary/60 text-[10px] uppercase font-bold">{review.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
