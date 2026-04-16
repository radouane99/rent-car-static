import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";

export async function isCarAvailable(carId: string, startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const reservationsRef = collection(db, "reservations");
  
  // Overlap logic: (StartA <= EndB) and (EndA >= StartB)
  const q = query(
    reservationsRef,
    where("carId", "==", carId)
  );

  const querySnapshot = await getDocs(q);
  const existingReservations = querySnapshot.docs.map(doc => doc.data());

  for (const res of existingReservations) {
    const resStart = res.startDate.toDate();
    const resEnd = res.endDate.toDate();

    if (start <= resEnd && end >= resStart) {
      return false; // Overlap found
    }
  }

  return true;
}

export async function createReservation(reservationData: {
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  customerName: string;
  customerEmail: string;
}) {
  const available = await isCarAvailable(reservationData.carId, reservationData.startDate, reservationData.endDate);
  
  if (!available) {
    throw new Error("This masterpiece is already reserved for the selected period.");
  }

  return await addDoc(collection(db, "reservations"), {
    ...reservationData,
    startDate: Timestamp.fromDate(new Date(reservationData.startDate)),
    endDate: Timestamp.fromDate(new Date(reservationData.endDate)),
    createdAt: Timestamp.now(),
  });
}
