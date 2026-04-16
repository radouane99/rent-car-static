import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({ children, className, hoverable = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-sm p-6 overflow-hidden relative group",
        hoverable && "hover:shadow-primary/5 hover:border-white/20 transition-all duration-500",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
