import { ReactNode } from "react";
import BackgroundLayer from "./BackgroundLayer";

interface ChapterSectionProps {
  index: number;
  background?: string;
  bgStrength?: "hero" | "standard" | "subtle";
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function ChapterSection({
  index,
  background,
  bgStrength = "standard",
  children,
  className = "",
  noPadding = false,
}: ChapterSectionProps) {
  return (
    <section
      data-chapter-index={index}
      className={`chapter-snap isolate relative flex h-screen min-h-screen w-full shrink-0 overflow-hidden bg-navy ${className}`}
    >
      {background && (
        <BackgroundLayer src={background} strength={bgStrength} priority={index === 0} />
      )}
      <div
        className={`relative z-10 flex h-full w-full flex-col ${
          noPadding ? "" : "px-[4.2vw] pb-[6.5vh] pt-[7.5vh] md:pt-[8vh]"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
