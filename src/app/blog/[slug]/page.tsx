"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }));
}

const MOCK_POSTS = [
  {
    title: "5 Tips for Renting a Supercar in Monaco",
    slug: "monaco-supercar-rental-tips",
    content: `
      <h2>The Glamour of the French Riviera</h2>
      <p>Renting a supercar in Monaco is more than just a transaction; it's an entry into a world of unparalleled luxury. However, navigating the tight streets of the Principality requires concentration and local knowledge.</p>
      
      <h3>1. Know the Parking Rules</h3>
      <p>Monaco is notoriously strict about where you can leave your vehicle. Always use valet services at major hotels like the Hotel de Paris to ensure your asset is handled with care.</p>
      
      <h3>2. Timing is Everything</h3>
      <p>Avoid peak traffic hours during the Grand Prix season unless you want to be seen standing still. The best time for a coastal drive is early morning.</p>
    `,
    date: "April 10, 2026",
    author: "Alexander V.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function BlogPostDetails() {
  const { slug } = useParams();
  const post = MOCK_POSTS.find(p => p.slug === slug) || MOCK_POSTS[0];

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-12 uppercase text-xs tracking-widest font-bold">
           <ArrowLeft size={16} /> All Articles
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                     <User size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-white/40 font-bold">Author</p>
                    <p className="text-white text-xs font-bold uppercase tracking-widest">{post.author}</p>
                  </div>
               </div>
               <div>
                  <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Published</p>
                  <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-primary" /> {post.date}
                  </p>
               </div>
               <button className="ml-auto p-4 glass rounded-full hover:scale-110 transition-transform">
                  <Share2 size={18} className="text-primary" />
               </button>
            </div>
          </header>

          <div className="aspect-video overflow-hidden rounded-sm mb-16 glass gold-border">
             <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div 
            className="prose prose-invert prose-gold max-w-none text-white/70 leading-relaxed space-y-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-20 pt-10 border-t border-white/5">
             <GlassCard className="p-12 text-center bg-primary/5">
                <h3 className="text-white font-display font-bold text-2xl uppercase italic mb-4">Inspired by this journey?</h3>
                <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">Experience Monaco the way it was meant to be seen—from the driver's seat of an icon.</p>
                <Link href="/cars">
                  <button className="bg-primary text-dark font-black uppercase tracking-[0.3em] text-[10px] px-10 py-4 hover:bg-gold-light transition-colors">Select Your Vehicle</button>
                </Link>
             </GlassCard>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
