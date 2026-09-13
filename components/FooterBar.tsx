import { BarChart3 } from "lucide-react";

export default function FooterBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 px-[3.5vw] py-[2.2vh] md:py-[2.6vh]">
      <p className="shrink-0 whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/55 md:text-[0.68rem]">
        NIKEL&nbsp;&nbsp;/&nbsp;&nbsp;EKONOMI&nbsp;&nbsp;/&nbsp;&nbsp;SULAWESI TENGAH
      </p>
      <div className="hairline hidden flex-1 sm:block" />
      <BarChart3 className="h-4 w-4 shrink-0 text-cyan/80" strokeWidth={1.6} />
    </div>
  );
}
