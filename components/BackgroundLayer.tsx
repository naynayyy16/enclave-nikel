interface BackgroundLayerProps {
  src: string;
  /** dim: standard chapter dimming. hero: lighter dim for cover chapter. */
  strength?: "hero" | "standard" | "subtle";
  priority?: boolean;
}

export default function BackgroundLayer({
  src,
  strength = "standard",
}: BackgroundLayerProps) {
  const overlayByStrength: Record<string, string> = {
    hero: "from-navy/55 via-navy/55 to-navy",
    standard: "from-navy/75 via-navy/80 to-navy",
    subtle: "from-navy/85 via-navy/88 to-navy",
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden grain">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* base darkening + bottom gradient so text stays legible */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayByStrength[strength]}`}
      />
      {/* left-to-right gradient for headline legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/20 to-transparent" />
      {/* subtle radial teal glow, top area, for depth */}
      <div
        className="absolute -top-1/4 left-1/3 h-[60%] w-[60%] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(21,97,109,0.55) 0%, rgba(21,97,109,0) 70%)",
        }}
      />
    </div>
  );
}
