"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { 
  collection, query, onSnapshot, doc, 
  deleteDoc, addDoc, updateDoc, serverTimestamp, orderBy 
} from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Plus, Edit2, Trash2, X, Save, FileText, 
  Search, Calendar, ChevronRight, Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  createdAt: any;
  image?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image: "",
  });

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postList);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        content: formData.content,
        excerpt: formData.excerpt,
        image: formData.image,
        updatedAt: serverTimestamp(),
      } as any;

      if (editingPost) {
        await updateDoc(doc(db, "posts", editingPost.id), postData);
      } else {
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, "posts"), postData);
      }
      
      resetForm();
    } catch (err: any) {
      console.error(err);
      alert(`Transmission Interrupted: ${err.message || "Database Rejected"}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", content: "", excerpt: "", image: "" });
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("🚨 SECURITY WARNING: Are you sure you want to permanently erase this intelligence asset from the public node?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Content Node Online</span>
           </div>
           <h1 className="text-5xl font-display font-black text-white uppercase italic tracking-tighter">
              CONTENT <span className="text-primary">STUDIO</span>
           </h1>
           <p className="text-white/30 text-xs uppercase tracking-widest mt-2">Manage global luxury narratives and SEO assets.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="h-14 px-8 flex items-center gap-3 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          <span className="uppercase font-black text-xs tracking-widest">Forge New Article</span>
        </Button>
      </header>

      {/* Control Bar */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center border-white/5">
         <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text"
              placeholder="Search intelligence via title or slug..."
              className="w-full bg-white/5 border border-white/10 rounded-none pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard className="group p-6 flex flex-col md:flex-row items-center justify-between border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-full bg-primary/5 -skew-x-12 translate-x-16 group-hover:translate-x-4 transition-transform duration-700" />
                 
                 <div className="flex items-center gap-8 w-full mr-12">
                    <div className="p-5 bg-white/5 border border-white/10 shrink-0 group-hover:bg-primary/10 transition-colors">
                       <FileText size={24} className="text-primary/40 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-grow">
                       <div className="flex items-center gap-3 mb-2">
                          <p className="text-white font-black uppercase italic tracking-tight text-lg">{post.title}</p>
                          <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Live Node</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                             <Calendar size={12} className="text-primary/40" /> 
                             {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Real-time Syncing'}
                          </p>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold">Slug: <span className="text-white/40">/{post.slug}</span></p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-2 w-full md:w-auto shrink-0 mt-6 md:mt-0">
                    <button 
                      onClick={() => handleEdit(post)}
                      className="flex-grow p-4 glass rounded-sm text-[9px] uppercase font-black tracking-[0.2em] hover:text-primary hover:border-primary/50 transition-all"
                    >
                      Refine Asset
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-4 glass rounded-sm text-red-500/40 hover:text-red-500 hover:border-red-500/50 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    <a 
                      href={`/blog/${post.slug}`} 
                      target="_blank"
                      className="p-4 glass rounded-sm text-white/20 hover:text-white transition-all"
                    >
                       <Eye size={16} />
                    </a>
                 </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredPosts.length === 0 && (
          <div className="py-24 text-center">
             <p className="text-white/20 uppercase tracking-[0.5em] text-[10px] font-bold italic animate-pulse">Scanning Global Neural Net... No Match Found</p>
          </div>
        )}
      </div>

      {/* Blog Forge Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/94 backdrop-blur-2xl" 
               onClick={resetForm} 
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="w-full max-w-5xl relative z-10"
             >
                <GlassCard className="p-12 gold-border shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10" />
                   
                   <div className="flex justify-between items-start mb-12">
                      <div>
                        <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter leading-none">
                           {editingPost ? "Refining Intelligence" : "Forging New Narrative"}
                        </h2>
                        <div className="flex items-center gap-3 mt-4">
                           <div className="h-[2px] w-6 bg-primary" />
                           <p className="text-primary text-[10px] uppercase font-bold tracking-[0.4em]">Protocol: {editingPost ? "PATCH_CONTENT" : "POST_NEW_ARTICLE"}</p>
                        </div>
                      </div>
                      <button onClick={resetForm} className="p-4 glass text-white/40 hover:text-white transition-colors"><X size={24} /></button>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-8">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Primary Narrative Headline</label>
                               <input 
                                 required 
                                 placeholder="Headline..."
                                 className="w-full bg-white/5 border border-white/10 p-5 text-sm font-bold text-white focus:outline-none focus:border-primary transition-all rounded-none" 
                                 value={formData.title} 
                                 onChange={e => setFormData({...formData, title: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">URL Routing Slug</label>
                               <input 
                                 placeholder="leave-blank-to-auto-generate"
                                 className="w-full bg-white/5 border border-white/10 p-5 text-xs text-white/60 focus:outline-none focus:border-primary transition-all rounded-none font-mono" 
                                 value={formData.slug} 
                                 onChange={e => setFormData({...formData, slug: e.target.value})}
                               />
                            </div>
                         </div>
                         <div className="space-y-8">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Cover Heritage (Image URL)</label>
                               <input 
                                 placeholder="https://images.unsplash.com/..."
                                 className="w-full bg-white/5 border border-white/10 p-5 text-xs text-white/60 focus:outline-none focus:border-primary transition-all rounded-none font-mono" 
                                 value={formData.image} 
                                 onChange={e => setFormData({...formData, image: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Executive Excerpt (SEO)</label>
                               <input 
                                 placeholder="A brief summary for global search engines..."
                                 className="w-full bg-white/5 border border-white/10 p-5 text-xs text-white/60 focus:outline-none focus:border-primary transition-all rounded-none" 
                                 value={formData.excerpt} 
                                 onChange={e => setFormData({...formData, excerpt: e.target.value})}
                               />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between items-end mb-2">
                            <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em]">Master Narrative Content (HTML Supported)</label>
                            <span className="text-[8px] text-primary/50 font-bold uppercase tracking-widest">Protocol: UTF-8 SECURE</span>
                         </div>
                         <textarea 
                           required 
                           rows={12}
                           placeholder="Type your mastery here..."
                           className="w-full bg-white/5 border border-white/10 p-8 text-sm text-white/80 leading-relaxed focus:outline-none focus:border-primary transition-all rounded-none font-mono" 
                           value={formData.content} 
                           onChange={e => setFormData({...formData, content: e.target.value})}
                         />
                      </div>

                      <div className="pt-6">
                         <Button type="submit" disabled={loading} className="w-full h-20 flex items-center justify-center gap-6 group">
                            {loading ? (
                              <div className="flex items-center gap-4">
                                 <div className="w-5 h-5 border-[3px] border-dark border-t-transparent rounded-full animate-spin" />
                                 <span className="uppercase font-black text-sm tracking-[0.4em] italic">Transmitting Intelligence...</span>
                              </div>
                            ) : (
                              <>
                                <Save size={24} className="group-hover:scale-110 transition-transform" /> 
                                <span className="uppercase font-black text-sm tracking-[0.5em] italic">Sync Global Content Node</span>
                              </>
                            )}
                         </Button>
                      </div>
                   </form>
                </GlassCard>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
