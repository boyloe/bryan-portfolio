export default function SceneFallback() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at 60% 50%, rgba(0,102,255,0.12) 0%, rgba(0,212,255,0.06) 30%, transparent 70%), var(--bg-primary)",
      }}
    >
      {/* Animated gradient orbs as fallback */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00d4ff, #0066ff)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0066ff, transparent)",
          animation: "pulse 8s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
