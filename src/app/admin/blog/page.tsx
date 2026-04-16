"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, X, Save, FileText } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  createdAt: any;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
  });

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postList);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, "-"),
        content: formData.content,
        excerpt: formData.excerpt,
        updatedAt: serverTimestamp(),
      } as any;

      if (editingPost) {
        await updateDoc(doc(db, "posts", editingPost.id), postData);
      } else {
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, "posts"), postData);
      }
      
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving post.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", content: "", excerpt: "" });
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
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently archive this article?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">
             Content <span className="text-primary">Studio</span>
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Manage your luxury SEO articles.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} /> Compose Article
        </Button>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <GlassCard key={post.id} className="p-6 flex items-center justify-between border-white/5 hover:border-primary/20 transition-all duration-500">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-white/5 border border-white/10">
                   <FileText size={24} className="text-primary/40" />
                </div>
                <div>
                   <h3 className="text-white font-bold uppercase italic tracking-tight">{post.title}</h3>
                   <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">/{post.slug}</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button onClick={() => handleEdit(post)} className="p-2 text-white/40 hover:text-primary transition-colors uppercase text-[9px] font-black tracking-widest">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="p-2 text-white/40 hover:text-red-500 transition-colors uppercase text-[9px] font-black tracking-widest">Archive</button>
             </div>
          </GlassCard>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={resetForm} />
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-4xl relative z-10"
           >
              <GlassCard className="p-10 border-primary/20 shadow-2xl">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-display font-black text-white italic uppercase leading-none">
                       {editingPost ? "Refine Mastery" : "Forge New Insight"}
                    </h2>
                    <button onClick={resetForm} className="text-white/40 hover:text-white"><X size={24} /></button>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Article Title</label>
                          <input 
                            required 
                            className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-primary" 
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">URL Slug</label>
                          <input 
                            className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-primary" 
                            value={formData.slug} 
                            onChange={e => setFormData({...formData, slug: e.target.value})}
                            placeholder="auto-generated-if-empty"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Article Summary (SEO Excerpt)</label>
                       <input 
                          className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-primary" 
                          value={formData.excerpt} 
                          onChange={e => setFormData({...formData, excerpt: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Master Content (Markdown/HTML Supported)</label>
                       <textarea 
                         required
                         rows={12}
                         className="w-full bg-white/5 border border-white/10 p-6 text-sm text-white focus:outline-none focus:border-primary font-mono leading-relaxed" 
                         value={formData.content} 
                         onChange={e => setFormData({...formData, content: e.target.value})}
                       />
                    </div>

                    <div className="flex pt-4">
                       <Button type="submit" disabled={loading} className="w-full h-16 flex items-center justify-center gap-3 text-sm font-black tracking-[0.4em] uppercase">
                          {loading ? "Transmitting..." : <><Save size={18} /> Publish to Journal</>}
                       </Button>
                    </div>
                 </form>
              </GlassCard>
           </motion.div>
        </div>
      )}
    </div>
  );
}

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
