import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxDrive | Premium Luxury Car Rental",
  description: "Experience the world's most exclusive automotive icons. High-end car rentals with professional service and elite performance.",
  keywords: ["luxury car rental", "supercar rental", "exotic cars", "private chauffeur", "premium rentals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
