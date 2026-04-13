import { Bell, Settings } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export function Topbar() {
  return (
    <div
      className="fixed top-0 left-[240px] right-0 h-[56px] border-b flex items-center px-6 justify-between z-10"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <h1
          className="font-display text-[15px] font-semibold tracking-wide"
          style={{ color: 'var(--accent-primary)' }}
        >
          ORBITWATCH
        </h1>

        {/* Satellite Selector */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] transition-all hover:brightness-110"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <span className="font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>
            SAT-7 — Sentinel-Alpha
          </span>
          <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
        </button>

        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <div className="relative w-2 h-2">
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--status-nominal)' }}
            />
            <style>{`
              @keyframes pulse-live {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}</style>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: 'var(--status-nominal)',
                animation: 'pulse-live 2000ms ease-in-out infinite'
              }}
            />
          </div>
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: 'var(--status-nominal)' }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-overlay)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={18} strokeWidth={1.5} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--status-critical)' }}
          />
        </button>

        {/* Settings */}
        <button
          className="p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-overlay)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Settings size={18} strokeWidth={1.5} />
        </button>

        {/* Operator Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: '#FFFFFF'
          }}
        >
          JC
        </div>
      </div>
    </div>
  );
}
