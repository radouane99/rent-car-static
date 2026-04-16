"use client";

import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

interface BlogPostClientProps {
  post: {
    title: string;
    content: string;
    date: string;
    author: string;
    image: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
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
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic mb-8 leading-tight text-gold-gradient">
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
            className="prose prose-invert prose-gold max-w-none text-white/70 leading-relaxed space-y-8 blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-20 pt-10 border-t border-white/5">
             <GlassCard className="p-12 text-center bg-primary/5">
                <h3 className="text-white font-display font-bold text-2xl uppercase italic mb-4">Inspired by this journey?</h3>
                <p className="text-white/50 mb-8 max-w-md mx-auto text-sm">Experience the world the way it was meant to be seen—from the driver's seat of an icon.</p>
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
