import { ReactNode } from "react";

export function ChapterKicker({ children }: { children: ReactNode }) {
  return (
    <p className="reveal text-cyan text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.25em]">
      {children}
    </p>
  );
}

export function ChapterHeadline({
  children,
  size = "lg",
}: {
  children: ReactNode;
  size?: "lg" | "md";
}) {
  const sizing =
    size === "lg"
      ? "text-[2.1rem] leading-[1.08] md:text-5xl lg:text-[3.4rem] lg:leading-[1.06]"
      : "text-[1.7rem] leading-[1.1] md:text-4xl lg:text-5xl";
  return (
    <h1
      className={`reveal font-serif font-bold text-cream text-balance mt-2 mb-4 ${sizing}`}
    >
      {children}
    </h1>
  );
}

export function ChapterBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`reveal text-cream/75 text-[0.82rem] md:text-[0.95rem] leading-relaxed max-w-lg font-sans ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="reveal text-cream/60 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.18em]">
      {children}
    </p>
  );
}
