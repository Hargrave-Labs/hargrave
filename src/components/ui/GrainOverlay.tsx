export function GrainOverlay() {
  return (
    <div
      // Grain reads as fine texture on desktop but as harsh static on a
      // high-DPR phone, so it's cut to a whisper below lg and coarsened.
      className="absolute inset-0 pointer-events-none z-[1] rounded-[inherit] opacity-[0.04] lg:opacity-[0.15]"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '340px 340px',
      }}
    />
  );
}
