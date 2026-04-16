import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-dark uppercase leading-tight mb-4">
            READY TO START YOUR <br />
            ELITE JOURNEY?
          </h2>
          <p className="text-dark/70 text-lg font-medium">
            Contact our private concierge for tailored requests and long-term rentals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <Button variant="glass" size="lg" className="bg-dark text-white hover:bg-dark/90 border-none">
            Book Now
          </Button>
          <Button variant="outline" size="lg" className="border-dark text-dark hover:bg-dark/10">
            Contact Concierge
          </Button>
        </div>
      </div>
    </section>
  );
}
