import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Download } from 'lucide-react';
import { Card } from '../components/Card';
import { ReliabilityBadge } from '../components/ReliabilityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { SecondaryButton } from '../components/SecondaryButton';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const incidents = [
  {
    id: 'ALT-20260413-0047',
    timestamp: '2026-04-13 14:32:07',
    subsystem: 'Power (EPS)',
    severity: 'WARNING' as const,
    reliability: 68,
    duration: '14m 22s',
    decision: 'Investigated — switched to backup',
    outcome: 'Resolved',
    feedback: 'reliable' as const
  },
  {
    id: 'ALT-20260413-0043',
    timestamp: '2026-04-13 14:18:31',
    subsystem: 'Thermal (Zone 2)',
    severity: 'CRITICAL' as const,
    reliability: 84,
    duration: '22m 18s',
    decision: 'Escalated to thermal engineer',
    outcome: 'Pending',
    feedback: 'reliable' as const
  },
  {
    id: 'ALT-20260413-0039',
    timestamp: '2026-04-13 14:41:15',
    subsystem: 'Communications (Antenna A)',
    severity: 'WARNING' as const,
    reliability: 52,
    duration: '8m 05s',
    decision: 'Dismissed as transient',
    outcome: 'Dismissed',
    feedback: 'false' as const
  },
  {
    id: 'ALT-20260412-0158',
    timestamp: '2026-04-12 23:15:42',
    subsystem: 'Attitude Control',
    severity: 'CRITICAL' as const,
    reliability: 91,
    duration: '3m 44s',
    decision: 'Reset reaction wheel controller',
    outcome: 'Resolved',
    feedback: 'reliable' as const
  },
  {
    id: 'ALT-20260412-0142',
    timestamp: '2026-04-12 19:22:18',
    subsystem: 'Onboard Computer',
    severity: 'WARNING' as const,
    reliability: 45,
    duration: '1m 12s',
    decision: 'Monitored — no action needed',
    outcome: 'Dismissed',
    feedback: 'false' as const
  }
];

export function IncidentLog() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Incident Log
        </h1>
        <SecondaryButton>
          <div className="flex items-center gap-2">
            <Download size={16} />
            <span>Export CSV</span>
          </div>
        </SecondaryButton>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>
              Date Range
            </label>
            <select
              className="w-full h-[36px] px-3 rounded-[var(--radius-md)] border text-[13px]"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>
              Severity
            </label>
            <select
              className="w-full h-[36px] px-3 rounded-[var(--radius-md)] border text-[13px]"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              <option>All</option>
              <option>Critical</option>
              <option>Warning</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>
              Subsystem
            </label>
            <select
              className="w-full h-[36px] px-3 rounded-[var(--radius-md)] border text-[13px]"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              <option>All</option>
              <option>Power</option>
              <option>Thermal</option>
              <option>Communications</option>
              <option>Attitude Control</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>
              Outcome
            </label>
            <select
              className="w-full h-[36px] px-3 rounded-[var(--radius-md)] border text-[13px]"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              <option>All</option>
              <option>Resolved</option>
              <option>Pending</option>
              <option>Dismissed</option>
              <option>Escalated</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  ALERT ID
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  TIMESTAMP
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  SUBSYSTEM
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  SEVERITY
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  RELIABILITY
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  DURATION
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  OPERATOR DECISION
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  OUTCOME
                </th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                  FEEDBACK
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident, index) => (
                <tr
                  key={incident.id}
                  className="border-b cursor-pointer transition-all duration-100"
                  style={{
                    backgroundColor: index % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                    borderColor: 'var(--border-subtle)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-overlay)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)';
                  }}
                  onClick={() => navigate(`/alert/${incident.id}`)}
                >
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: 'var(--accent-primary)' }}>
                    {incident.id}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    {incident.timestamp}
                  </td>
                  <td className="px-4 py-3 text-[12px]" style={{ color: 'var(--text-primary)' }}>
                    {incident.subsystem}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={incident.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <ReliabilityBadge score={incident.reliability} size="small" />
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    {incident.duration}
                  </td>
                  <td className="px-4 py-3 text-[12px]" style={{ color: 'var(--text-primary)' }}>
                    {incident.decision}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-[var(--radius-sm)] text-[10px] font-semibold"
                      style={{
                        backgroundColor: incident.outcome === 'Resolved' ? 'var(--status-nominal-bg)' : 'var(--bg-elevated)',
                        color: incident.outcome === 'Resolved' ? 'var(--status-nominal)' : 'var(--text-secondary)'
                      }}
                    >
                      {incident.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {incident.feedback === 'reliable' ? (
                      <ThumbsUp size={14} style={{ color: 'var(--status-nominal)', display: 'inline' }} />
                    ) : (
                      <ThumbsDown size={14} style={{ color: 'var(--status-critical)', display: 'inline' }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="px-4 py-3 flex items-center justify-between border-t"
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            Showing 1-{incidents.length} of {incidents.length} incidents
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 rounded-[var(--radius-md)] text-[12px]"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
            >
              Previous
            </button>
            <button
              className="px-3 py-1.5 rounded-[var(--radius-md)] text-[12px]"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
