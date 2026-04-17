import { Suspense } from "react";
import CarDetailsClient from "@/components/cars/CarDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-dark pt-32 flex items-center justify-center text-primary uppercase tracking-[0.4em] animate-pulse">Initializing Luxury...</div>}>
      <CarDetailsClient id={id} />
    </Suspense>
  );
}
