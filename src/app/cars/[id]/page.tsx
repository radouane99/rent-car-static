import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import CarDetailsClient from "@/components/cars/CarDetailsClient";

export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }))
    .filter(params => params.id !== undefined && params.id !== null);
  } catch (error) {
    console.error("Error generating static params for cars:", error);
    return [];
  }
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CarDetailsClient id={id} />;
}
