import { Suspense } from "react";
import CarDetailsClient from "@/components/cars/CarDetailsClient";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-dark pt-32 flex items-center justify-center text-primary uppercase tracking-[0.4em] animate-pulse">Initializing Luxury...</div>}>
      <CarDetailsClient id={id} />
    </Suspense>
  );
}
