import { Card } from '../components/Card';
import { ReliabilityBadge } from '../components/ReliabilityBadge';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const feedbackData = [
  { id: 'ALT-20260413-0047', subsystem: 'Power (EPS)', reliability: 68, rating: 'reliable' as const, notes: 'Accurate detection of actual power issue' },
  { id: 'ALT-20260413-0043', subsystem: 'Thermal (Zone 2)', reliability: 84, rating: 'reliable' as const, notes: 'Correctly identified thermal anomaly' },
  { id: 'ALT-20260413-0039', subsystem: 'Communications', reliability: 52, rating: 'false' as const, notes: 'Transient signal loss, not a real fault' },
  { id: 'ALT-20260412-0158', subsystem: 'Attitude Control', reliability: 91, rating: 'reliable' as const, notes: '' },
  { id: 'ALT-20260412-0142', subsystem: 'Onboard Computer', reliability: 45, rating: 'false' as const, notes: 'Brief CPU spike, normal operation' }
];

const trendData = [
  { date: 'Mar 14', rate: 26 },
  { date: 'Mar 21', rate: 24 },
  { date: 'Mar 28', rate: 22 },
  { date: 'Apr 4', rate: 20 },
  { date: 'Apr 11', rate: 18 }
];

const patterns = [
  { subsystem: 'Power', description: 'Battery voltage drops correlated with solar eclipse events', incidents: 12 },
  { subsystem: 'Thermal', description: 'Zone 2 overheating during high computational load periods', incidents: 8 },
  { subsystem: 'Communications', description: 'Transient signal loss during orbital position changes', incidents: 15 }
];

export function OperatorFeedback() {
  return (
    <div>
      <h1 className="text-[24px] font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Operator Feedback & System Learning
      </h1>

      <div className="grid grid-cols-[60%_40%] gap-6">
        {/* Left: Feedback Submitted */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Feedback submitted
              </h2>
              <div className="flex gap-2">
                {['All', 'Reliable', 'False alarms'].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] transition-all"
                    style={{
                      backgroundColor: filter === 'All' ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                      color: filter === 'All' ? '#FFFFFF' : 'var(--text-secondary)'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {feedbackData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-[var(--radius-md)] border"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-mono text-[11px] mb-1" style={{ color: 'var(--accent-primary)' }}>
                        {item.id}
                      </p>
                      <p className="text-[13px] font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {item.subsystem}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ReliabilityBadge score={item.reliability} size="small" />
                      {item.rating === 'reliable' ? (
                        <ThumbsUp size={16} style={{ color: 'var(--status-nominal)' }} />
                      ) : (
                        <ThumbsDown size={16} style={{ color: 'var(--status-critical)' }} />
                      )}
                    </div>
                  </div>
                  {item.notes && (
                    <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Model Improvement */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Model improvement summary
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-[11px] font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                  Total Feedback Submitted
                </p>
                <p className="text-[24px] font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {feedbackData.length}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                  False Alarm Rate Trend (30d)
                </p>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      stroke="var(--border-subtle)"
                    />
                    <YAxis
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      stroke="var(--border-subtle)"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-strong)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="var(--status-nominal)"
                      strokeWidth={2}
                      dot={{ fill: 'var(--status-nominal)', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <p className="text-[11px] font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                  Last Model Update
                </p>
                <p className="font-mono text-[12px]" style={{ color: 'var(--text-primary)' }}>
                  2026-04-13 02:15:00 UTC
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Patterns learned
            </h2>

            <div className="space-y-3">
              {patterns.map((pattern, i) => (
                <div
                  key={i}
                  className="p-3 rounded-[var(--radius-md)] border"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {pattern.subsystem}
                    </p>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius-sm)]"
                      style={{
                        backgroundColor: 'var(--accent-primary-muted)',
                        color: 'var(--accent-primary)'
                      }}
                    >
                      {pattern.incidents} incidents
                    </span>
                  </div>
                  <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    {pattern.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
