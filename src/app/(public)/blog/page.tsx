"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  createdAt: any;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
        setPosts(postList);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Luxury Insights</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase mb-6">
            The <span className="text-gold-gradient">LuxDrive</span> Journal
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Exploring the world of high-end automotive culture, travels, and the art of luxury living.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loading ? (
             [1, 2, 3].map(i => <div key={i} className="glass aspect-video animate-pulse" />)
          ) : (
            posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <GlassCard className="group flex flex-col h-full border-none p-0 overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-4 text-[9px] uppercase tracking-widest text-primary font-bold">
                       <span className="flex items-center gap-1">
                         <Calendar size={10} /> 
                         {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Recent'}
                       </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-display font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors uppercase">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest">
                      Read Article <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))
          )}
        </div>

        {/* Dynamic SEO Placeholder */}
        <div className="mt-32 p-12 glass border-dashed border-white/10 text-center">
           <h4 className="text-white/30 font-bold uppercase tracking-[0.5em] text-xs mb-4">Premium Partners</h4>
           <div className="flex flex-wrap justify-center gap-12 opacity-20 grayscale">
              {["LAMBORGHINI", "FERRARI", "ROLLS-ROYCE", "BENTLEY", "PORSCHE"].map(brand => (
                <span key={brand} className="text-white font-black text-xl">{brand}</span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
