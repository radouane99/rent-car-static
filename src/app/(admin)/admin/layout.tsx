"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { 
  LayoutDashboard, Car, FileText, Settings, 
  LogOut, ExternalLink, Menu, X, Shield, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-6">
       <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
       <p className="text-primary uppercase tracking-[0.5em] text-[10px] font-bold animate-pulse">Establishing Secure Uplink</p>
    </div>
  );

  const navLinks = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Command Center" },
    { href: "/admin/cars", icon: Car, label: "Fleet Inventory" },
    { href: "/admin/blog", icon: FileText, label: "Global Content" },
    { href: "/admin/settings", icon: Settings, label: "Core Protocol" },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-gray-900 selection:bg-primary selection:text-white">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-[50] flex flex-col bg-white border-r border-gray-200 transition-all duration-500 ease-in-out shadow-[0_0_40px_rgba(0,0,0,0.02)]",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md z-[60]"
        >
          {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
        </button>

        {/* Logo Section */}
        <div className="p-8 mb-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Shield size={20} />
                </div>
                {isSidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                      <h1 className="text-lg font-display font-black italic tracking-tighter uppercase leading-none text-gray-900">
                          BENADADA
                      </h1>
                      <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-gray-400">System Control</span>
                  </motion.div>
                )}
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 space-y-2">
           {navLinks.map((link) => (
             <AdminNavLink 
               key={link.href}
               href={link.href} 
               icon={link.icon} 
               label={link.label} 
               isActive={pathname === link.href}
               isOpen={isSidebarOpen}
             />
           ))}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 mt-auto space-y-2">
            <Link 
              href="/" 
              target="_blank" 
              className={cn(
                "flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-sm transition-colors group",
                !isSidebarOpen && "justify-center"
              )}
            >
               <Globe size={18} className="group-hover:text-primary transition-colors shrink-0" />
               {isSidebarOpen && <span className="text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">View Public Node</span>}
            </Link>
            
            <button 
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-4 px-4 py-3 text-red-500/70 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors w-full group",
                !isSidebarOpen && "justify-center"
              )}
            >
               <LogOut size={18} className="shrink-0" />
               {isSidebarOpen && <span className="text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">Terminate Access</span>}
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn(
        "flex-grow transition-all duration-500 ease-in-out",
        isSidebarOpen ? "ml-72" : "ml-20"
      )}>
        {/* Header / Top Bar */}
        <header className="h-20 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-[30] px-12 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="h-8 w-[1px] bg-gray-200" />
              <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                 Current Node: <span className="text-gray-900">{pathname.split('/').pop()}</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-900 font-bold uppercase tracking-wider">{user?.email?.split('@')[0]}</span>
                  <span className="text-[8px] text-primary uppercase font-black tracking-tighter">System Administrator</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark p-[1px] shadow-sm">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-display font-black text-primary text-xs">
                    {user?.email?.[0].toUpperCase()}
                  </div>
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="p-12 max-w-[1600px] mx-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  icon: any;
  label: string;
  isActive: boolean;
  isOpen: boolean;
}

function AdminNavLink({ href, icon: Icon, label, isActive, isOpen }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-4 px-4 py-4 rounded-sm transition-all duration-300 group relative",
        isActive 
          ? "bg-primary/5 text-primary border-r-2 border-primary" 
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
        !isOpen && "justify-center px-0"
      )}
    >
      <Icon size={20} className={cn("shrink-0", isActive && "text-primary")} />
      
      {isOpen ? (
        <span className="text-[10px] uppercase tracking-[0.2em] font-black whitespace-nowrap">
          {label}
        </span>
      ) : (
        <div className="absolute left-full ml-4 px-3 py-2 bg-white border border-gray-200 shadow-lg rounded-sm text-[8px] uppercase font-bold tracking-widest text-primary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
           {label}
        </div>
      )}

      {isActive && isOpen && (
        <motion.div 
          layoutId="activeNav"
          className="absolute inset-0 bg-primary/5 -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
