import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Brain, Clock, Link2, History, Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from '../components/Card';
import { ReliabilityBadge } from '../components/ReliabilityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { MiniSparkline } from '../components/MiniSparkline';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { TextInput } from '../components/TextInput';
import { useState } from 'react';

const subsystemsData = [
  { name: 'Battery Pack A', value: '24.1V', status: 'below', sparkline: [26, 25.8, 25.5, 25, 24.5, 24.1] },
  { name: 'Battery Pack B', value: '23.8V', status: 'below', sparkline: [26, 25.9, 25.7, 25.2, 24.8, 23.8] },
  { name: 'EPS Controller', value: 'FAULT', status: 'fault', sparkline: [1, 1, 1, 0, 0, 0] },
  { name: 'Solar Array Current', value: '0.0A', status: 'fault', sparkline: [2.5, 2.3, 1.8, 1.2, 0.5, 0] }
];

const features = [
  { name: 'Battery_A_Voltage_Deviation', importance: 0.92 },
  { name: 'Battery_B_Voltage_Deviation', importance: 0.88 },
  { name: 'Solar_Array_Current_Drop', importance: 0.85 },
  { name: 'EPS_Fault_Flag_Active', importance: 0.78 },
  { name: 'Power_Bus_Load_Ratio', importance: 0.65 }
];

export function AlertDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [actionText, setActionText] = useState('');
  const [resolved, setResolved] = useState(false);
  const [feedback, setFeedback] = useState<'reliable' | 'false' | null>(null);

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 mb-6 transition-all"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <ArrowLeft size={16} />
        <span className="text-[13px]">Back to dashboard</span>
      </button>

      <div className="grid grid-cols-[60%_40%] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Alert Header */}
          <Card>
            <h1 className="text-[18px] font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Power bus undervoltage — Subsystem group: EPS
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] px-2 py-1 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                {id || 'ALT-20260413-0047'}
              </span>
              <StatusBadge status="WARNING" />
              <ReliabilityBadge score={68} size="large" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-[12px]">
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>First detected</p>
                <p className="font-mono" style={{ color: 'var(--text-primary)' }}>14:32:07 UTC</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Duration</p>
                <p className="font-mono" style={{ color: 'var(--text-primary)' }}>14m 22s</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Temporal consistency</p>
                <p style={{ color: 'var(--status-nominal)' }}>Persistent</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Cross-signal consistency</p>
                <p style={{ color: 'var(--status-nominal)' }}>4/4 correlated</p>
              </div>
            </div>
          </Card>

          {/* AI Explanation Report */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} style={{ color: 'var(--accent-primary)' }} />
              <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                Reliability assessment report
              </h2>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                Summary
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                A sustained undervoltage condition has been detected on the main power bus. The alert has remained consistent over 14 minutes and is corroborated by 4 correlated voltage-dependent subsystems. Reliability score: 68% — treat as probable real fault.
              </p>
            </div>

            {/* Temporal Consistency */}
            <div className="mb-6">
              <h3 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                Temporal consistency
              </h3>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'var(--status-warning)', width: '85%' }}
                />
              </div>
              <p className="text-[11px] mt-2" style={{ color: 'var(--status-warning)' }}>
                Persistent — firing continuously for 14m 22s
              </p>
            </div>

            {/* Cross-signal Consistency */}
            <div className="mb-6">
              <h3 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                Cross-signal consistency
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Battery Pack A', value: '24.1V (below threshold)', status: true },
                  { name: 'Battery Pack B', value: '23.8V (below threshold)', status: true },
                  { name: 'EPS Controller', value: 'fault flag raised', status: true },
                  { name: 'Solar Array Current', value: '0.0A (no input)', status: true }
                ].map((signal, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    {signal.status ? (
                      <Check size={14} style={{ color: 'var(--status-nominal)' }} />
                    ) : (
                      <X size={14} style={{ color: 'var(--status-critical)' }} />
                    )}
                    <span style={{ color: 'var(--text-primary)' }}>
                      {signal.name} — {signal.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributing Features */}
            <details className="mb-6">
              <summary className="text-[13px] font-semibold cursor-pointer mb-3" style={{ color: 'var(--text-secondary)' }}>
                Contributing features (XAI)
              </summary>
              <div className="space-y-2 mt-3">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px]" style={{ color: 'var(--text-primary)' }}>
                        {feature.name}
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                        {feature.importance.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          width: `${feature.importance * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </details>

            {/* Historical Match */}
            <div
              className="p-4 rounded-[var(--radius-md)] border"
              style={{
                backgroundColor: 'var(--accent-primary-muted)',
                borderColor: 'var(--accent-primary)'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <History size={16} style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <p className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Similar event on 2024-02-19
                  </p>
                  <p className="text-[12px] mb-3" style={{ color: 'var(--text-secondary)' }}>
                    Power bus undervoltage lasting 31 minutes. Operator action taken: Manual switchover to backup power bus. Outcome: Resolved.
                  </p>
                  <SecondaryButton>Apply same response?</SecondaryButton>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Affected Subsystems */}
          <Card>
            <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Affected subsystems (4)
            </h2>

            <div className="space-y-3 mb-4">
              {subsystemsData.map((sub, i) => (
                <div
                  key={i}
                  className="p-3 rounded-[var(--radius-md)] border"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>
                      {sub.name}
                    </p>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--status-critical)' }}>
                      {sub.value}
                    </span>
                  </div>
                  <MiniSparkline data={sub.sparkline} inFaultState={true} />
                </div>
              ))}
            </div>

            <button className="text-[13px]" style={{ color: 'var(--accent-primary)' }}>
              View all subsystems
            </button>
          </Card>

          {/* Operator Action Panel */}
          <Card>
            <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Log your decision
            </h2>

            <textarea
              className="w-full min-h-[80px] p-3 rounded-[var(--radius-md)] border text-[13px] mb-3"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
              placeholder="Describe the action taken"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'Investigated — no action',
                'Switched to backup',
                'Escalated to lead',
                'Scheduled maintenance',
                'Dismissed as false alarm'
              ].map((action) => (
                <button
                  key={action}
                  className="px-3 py-1.5 rounded-[var(--radius-sm)] text-[11px] transition-all"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}
                  onClick={() => setActionText(action)}
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="resolved"
                checked={resolved}
                onChange={(e) => setResolved(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="resolved" className="text-[13px]" style={{ color: 'var(--text-primary)' }}>
                Mark as resolved
              </label>
            </div>

            <PrimaryButton fullWidth>Submit action log</PrimaryButton>
          </Card>

          {/* Operator Feedback Panel */}
          <Card>
            <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Rate this alert's reliability
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                className={`p-4 rounded-[var(--radius-md)] border-2 transition-all flex flex-col items-center gap-2 ${
                  feedback === 'reliable' ? 'border-[var(--status-nominal)]' : 'border-[var(--border-subtle)]'
                }`}
                style={{
                  backgroundColor: feedback === 'reliable' ? 'var(--status-nominal-bg)' : 'transparent'
                }}
                onClick={() => setFeedback('reliable')}
              >
                <ThumbsUp size={20} style={{ color: feedback === 'reliable' ? 'var(--status-nominal)' : 'var(--text-secondary)' }} />
                <span className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Reliable alert
                </span>
              </button>

              <button
                className={`p-4 rounded-[var(--radius-md)] border-2 transition-all flex flex-col items-center gap-2 ${
                  feedback === 'false' ? 'border-[var(--status-critical)]' : 'border-[var(--border-subtle)]'
                }`}
                style={{
                  backgroundColor: feedback === 'false' ? 'var(--status-critical-bg)' : 'transparent'
                }}
                onClick={() => setFeedback('false')}
              >
                <ThumbsDown size={20} style={{ color: feedback === 'false' ? 'var(--status-critical)' : 'var(--text-secondary)' }} />
                <span className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  False alarm
                </span>
              </button>
            </div>

            <TextInput placeholder="Add notes (optional)" className="mb-3" />

            <SecondaryButton fullWidth>Submit feedback</SecondaryButton>

            <p className="text-[11px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
              Your feedback trains the system to improve future reliability scoring.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
