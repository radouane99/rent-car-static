const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnqYIgxKKA53pln6gd-48Waf3rbCN6J3w",
  authDomain: "luxury-location-voiture.firebaseapp.com",
  projectId: "luxury-location-voiture",
  storageBucket: "luxury-location-voiture.firebasestorage.app",
  messagingSenderId: "446966645191",
  appId: "1:446966645191:web:ca1a9bcfb56c82f55799e2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cars = [
  {
    name: "Lamborghini Huracán EVO",
    price_per_day: 1500,
    category: "Supercar",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop",
    available: true,
    description: "The Huracán EVO is the evolution of the most successful V10-powered Lamborghini ever.",
    specs: { fuel: "Petrol", seats: 2, acceleration: "2.9s" }
  },
  {
    name: "Rolls-Royce Cullinan",
    price_per_day: 3500,
    category: "SUV",
    image: "https://images.unsplash.com/photo-1631214524020-5e18d976522b?auto=format&fit=crop&q=80&w=1000",
    available: true,
    description: "The most luxurious SUV ever built. Experience the peak of sophistication.",
    specs: { fuel: "Petrol", seats: 5, acceleration: "4.5s" }
  },
  {
    name: "Ferrari F8 Tributo",
    price_per_day: 1800,
    category: "Supercar",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
    available: true,
    description: "A tribute to the ultimate V8, the Ferrari F8 Tributo is the pinnacle of performance.",
    specs: { fuel: "Petrol", seats: 2, acceleration: "2.9s" }
  },
  {
    name: "Bentley Continental GT",
    price_per_day: 1200,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1000&auto=format&fit=crop",
    available: true,
    description: "The definition of Grand Touring. Elegance and power combined.",
    specs: { fuel: "Petrol", seats: 4, acceleration: "3.7s" }
  }
];

const posts = [
  {
    title: "How to Choose the Perfect Luxury Car for Your Wedding",
    slug: "luxury-wedding-car-guide",
    excerpt: "Make your special day even more memorable with the right elite vehicle.",
    content: "<p>Your wedding day is one of the most important moments of your life...</p>",
    createdAt: new Date()
  },
  {
    title: "The Ultimate Guide to Driving in Dubai",
    slug: "dubai-driving-guide",
    excerpt: "Tips and tricks for navigating the streets of the city of gold in a supercar.",
    content: "<p>Dubai is a city built for cars, specifically for luxury ones...</p>",
    createdAt: new Date()
  }
];

async function seed() {
  console.log("Starting seeding process...");
  
  try {
    for (const car of cars) {
      await addDoc(collection(db, "cars"), car);
      console.log(`Added car: ${car.name}`);
    }
    
    for (const post of posts) {
      await addDoc(collection(db, "posts"), post);
      console.log(`Added post: ${post.title}`);
    }
    
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
