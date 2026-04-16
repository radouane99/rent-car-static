"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock, User, Car } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
            <div className="inline-flex p-4 glass rounded-full mb-6 gold-border">
                <Car className="text-primary w-8 h-8" />
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">
                LUXDRIVE <span className="text-primary text-sm not-italic font-bold tracking-[0.3em]">ADMIN</span>
            </h1>
        </div>

        <GlassCard className="p-10 border-white/5">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Email Address</label>
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                 <input 
                   type="email" 
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-none pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                   placeholder="admin@luxdrive.com"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                 <input 
                   type="password" 
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-none pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                   placeholder="••••••••"
                 />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs uppercase tracking-widest text-center font-bold">{error}</p>}

            <Button 
                type="submit" 
                className="w-full font-black text-xs h-14" 
                disabled={loading}
            >
              {loading ? "Authenticating..." : "Establish Secure Connection"}
            </Button>
          </form>
        </GlassCard>
        
        <p className="mt-8 text-center text-white/20 text-[9px] uppercase tracking-[0.2em]">
            Authorized Personnel Only • Secure 256-bit Encryption
        </p>
      </motion.div>
    </div>
  );
}

// Helper to use motion without import issues in some Next setups
import { motion } from "framer-motion";
