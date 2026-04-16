"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { LayoutDashboard, Car, FileText, Settings, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      } else {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-primary uppercase tracking-[1em] animate-pulse">Security Check...</div>;

  return (
    <div className="flex min-h-screen bg-[#020202]">
      {/* Sidebar */}
      <aside className="w-64 bg-dark border-r border-white/5 flex flex-col p-6 fixed inset-y-0">
        <div className="mb-12">
            <h1 className="text-xl font-display font-black text-white italic tracking-tighter uppercase">
                LUXDRIVE <span className="text-primary text-[10px] block not-italic font-bold tracking-[0.4em] mt-1">Management</span>
            </h1>
        </div>

        <nav className="flex-grow space-y-2">
           <AdminNavLink href="/admin/dashboard" icon={LayoutDashboard} label="Overview" />
           <AdminNavLink href="/admin/cars" icon={Car} label="Fleet Manager" />
           <AdminNavLink href="/admin/blog" icon={FileText} label="Content / Blog" />
           <AdminNavLink href="/admin/settings" icon={Settings} label="Global Settings" />
        </nav>

        <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
           <Link href="/" target="_blank" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">
              <ExternalLink size={14} /> Public Website
           </Link>
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 text-red-500/60 hover:text-red-500 transition-colors text-[10px] uppercase tracking-widest font-bold w-full"
           >
              <LogOut size={14} /> Termination Session
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        {children}
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all duration-300",
        "text-white/40 hover:bg-white/5 hover:text-primary"
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
