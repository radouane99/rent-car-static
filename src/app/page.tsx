import { Hero } from "@/components/home/Hero";
import { SearchSection } from "@/components/home/SearchSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SearchSection />
      
      {/* Short About / Stats Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Elite Models", value: "50+" },
            { label: "Happy Clients", value: "2.5k+" },
            { label: "VIP Cities", value: "12" },
            { label: "Experience", value: "15Y" },
          ].map((stat, i) => (
            <div key={i} className="text-center group p-8 glass hover:gold-border duration-500">
              <span className="block text-4xl md:text-5xl font-display font-black text-white group-hover:text-primary transition-colors">{stat.value}</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2 font-bold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <FeaturedCars />
      <Testimonials />
      <CTA />
    </div>
  );
}
