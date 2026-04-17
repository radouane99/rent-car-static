import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  dark?: boolean;
}

export function GlassCard({ children, className, hoverable = true, dark = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm p-6 overflow-hidden relative group",
        dark ? "glass-dark" : "glass",
        hoverable && "hover:shadow-xl transition-all duration-500",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
        dark ? "bg-gradient-to-br from-white/5 to-transparent" : "bg-gradient-to-br from-primary/5 to-transparent"
      )} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
