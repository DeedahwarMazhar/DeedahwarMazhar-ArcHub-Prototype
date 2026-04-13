export function PulsingDot() {
  return (
    <div className="relative w-2 h-2">
      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(232, 64, 64, 0.7);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(232, 64, 64, 0);
          }
        }
      `}</style>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: 'var(--status-critical)',
          animation: 'pulse-dot 2000ms ease-in-out infinite'
        }}
      />
    </div>
  );
}
