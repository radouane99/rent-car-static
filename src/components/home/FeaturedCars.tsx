"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { CarCard, type Car } from "@/components/cars/CarCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useTranslation } from "@/lib/LanguageContext";

export function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const q = query(collection(db, "cars"), limit(3));
        const querySnapshot = await getDocs(q);
        const carList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
        setCars(carList);
      } catch (err) {
        console.error("Error fetching featured cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <section className="py-32 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{t("featured.subtitle")}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-800 uppercase">
              {t("featured.title1")} <span className="text-gold-gradient">{t("featured.title2")}</span>
            </h2>
          </div>
          <Link href="/cars">
            <Button variant="outline">{t("featured.viewAll")}</Button>
          </Link>
        </div>

        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <div key={i} className="bg-gray-100 aspect-video animate-pulse rounded-lg" />)}
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cars.map(car => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        )}
      </div>
    </section>
  );
}
