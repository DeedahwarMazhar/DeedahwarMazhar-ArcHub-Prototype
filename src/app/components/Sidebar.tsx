import { useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, AlertTriangle, Map, FileText, MessageSquare, Settings } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: 'Overview', icon: <LayoutDashboard size={20} strokeWidth={1.5} />, path: '/dashboard' },
    { label: 'Active Alerts', icon: <AlertTriangle size={20} strokeWidth={1.5} />, path: '/alerts' },
    { label: 'Subsystem Map', icon: <Map size={20} strokeWidth={1.5} />, path: '/subsystem-map' },
    { label: 'Incident Log', icon: <FileText size={20} strokeWidth={1.5} />, path: '/incident-log' },
    { label: 'Operator Feedback', icon: <MessageSquare size={20} strokeWidth={1.5} />, path: '/feedback' },
    { label: 'Settings', icon: <Settings size={20} strokeWidth={1.5} />, path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="fixed left-0 top-0 h-screen w-[240px] border-r flex flex-col"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      {/* Navigation Links */}
      <nav className="flex-1 py-6">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-6 py-3 text-left
                transition-all duration-100
                ${active ? 'border-l-[3px]' : 'border-l-[3px] border-transparent'}
              `}
              style={{
                backgroundColor: active ? 'var(--bg-overlay)' : 'transparent',
                borderLeftColor: active ? 'var(--accent-primary)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-overlay)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.icon}
              <span className="text-[14px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div
          className="px-3 py-2 rounded-[var(--radius-md)] mb-3"
          style={{ backgroundColor: 'var(--status-warning-bg)' }}
        >
          <p className="text-[11px] font-semibold" style={{ color: 'var(--status-warning)' }}>
            12 active alerts
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>
            Operator J. Chen
          </p>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Ground Control Lead
          </p>
        </div>
      </div>
    </div>
  );
}
