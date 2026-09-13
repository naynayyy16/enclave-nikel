import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card relative px-6 py-5 md:px-7 md:py-6 ${
        glow ? "shadow-[0_0_40px_-8px_rgba(0,229,255,0.25)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
