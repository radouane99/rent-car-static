"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Featured Cars Section */}
      <FeaturedCars />
      
      {/* Why Choose Us Section - New to match RealRent */}
      <WhyChooseUs />

      <Testimonials />
      <CTA />
    </div>
  );
}
