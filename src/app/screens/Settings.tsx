import { useState } from 'react';
import { Card } from '../components/Card';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/PrimaryButton';

const tabs = ['Profile', 'Alert thresholds', 'Notification preferences', 'Satellite configuration', 'Audit log'];

const auditLogs = [
  { timestamp: '2026-04-13 14:45:22', event: 'Session login', operator: 'J. Chen' },
  { timestamp: '2026-04-13 02:15:00', event: 'Model updated', operator: 'System' },
  { timestamp: '2026-04-12 18:30:15', event: 'Threshold changed: Reliability minimum 60% → 55%', operator: 'J. Chen' },
  { timestamp: '2026-04-12 09:12:08', event: 'Session login', operator: 'J. Chen' },
  { timestamp: '2026-04-11 23:45:33', event: 'Session logout', operator: 'J. Chen' }
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div>
      <h1 className="text-[24px] font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Settings
      </h1>

      <div className="grid grid-cols-[200px_1fr] gap-6">
        {/* Left: Tabs */}
        <div
          className="border-r pr-4"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-[var(--radius-md)] mb-1 transition-all text-[13px] ${
                activeTab === tab ? 'font-medium' : ''
              }`}
              style={{
                backgroundColor: activeTab === tab ? 'var(--bg-overlay)' : 'transparent',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right: Content */}
        <div>
          {activeTab === 'Profile' && (
            <Card>
              <h2 className="text-[16px] font-medium mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Operator Profile
              </h2>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-[12px] font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                    Full Name
                  </label>
                  <TextInput defaultValue="Jennifer Chen" />
                </div>

                <div>
                  <label className="text-[12px] font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <TextInput type="email" defaultValue="j.chen@orbitwatch.com" />
                </div>

                <div>
                  <label className="text-[12px] font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                    Role
                  </label>
                  <TextInput defaultValue="Ground Control Lead" disabled />
                </div>

                <div>
                  <label className="text-[12px] font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                    Operator ID
                  </label>
                  <TextInput defaultValue="OP-2847" disabled />
                </div>

                <PrimaryButton>Save changes</PrimaryButton>
              </div>
            </Card>
          )}

          {activeTab === 'Alert thresholds' && (
            <Card>
              <h2 className="text-[16px] font-medium mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Alert Thresholds
              </h2>

              <div className="space-y-6 max-w-md">
                <div>
                  <label className="text-[12px] font-semibold mb-3 block" style={{ color: 'var(--text-secondary)' }}>
                    Fault Confidence Threshold
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-[12px] font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>0%</span>
                    <span style={{ color: 'var(--text-primary)' }}>70%</span>
                    <span style={{ color: 'var(--text-muted)' }}>100%</span>
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold mb-3 block" style={{ color: 'var(--text-secondary)' }}>
                    Reliability Minimum
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="60"
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-[12px] font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>0%</span>
                    <span style={{ color: 'var(--text-primary)' }}>60%</span>
                    <span style={{ color: 'var(--text-muted)' }}>100%</span>
                  </div>
                </div>

                <PrimaryButton>Save changes</PrimaryButton>
              </div>
            </Card>
          )}

          {activeTab === 'Notification preferences' && (
            <Card>
              <h2 className="text-[16px] font-medium mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Notification Preferences
              </h2>

              <div className="space-y-4 max-w-md">
                {[
                  { label: 'Critical alerts', desc: 'Immediate notification for critical severity alerts' },
                  { label: 'Warning alerts', desc: 'Notification for warning severity alerts' },
                  { label: 'System updates', desc: 'Model updates and system maintenance notifications' },
                  { label: 'Operator feedback requests', desc: 'Reminders to provide feedback on resolved alerts' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4" />
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <PrimaryButton>Save changes</PrimaryButton>
              </div>
            </Card>
          )}

          {activeTab === 'Satellite configuration' && (
            <Card>
              <h2 className="text-[16px] font-medium mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Satellite Configuration
              </h2>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-[12px] font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                    Active Satellite
                  </label>
                  <select
                    className="w-full h-[36px] px-3 rounded-[var(--radius-md)] border text-[13px]"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option>SAT-7 — Sentinel-Alpha</option>
                    <option>SAT-12 — CommStar-B</option>
                    <option>SAT-19 — WeatherEye-3</option>
                  </select>
                </div>

                <div>
                  <p className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Monitored Subsystem Groups
                  </p>
                  <div className="space-y-2">
                    {['Power', 'Thermal', 'Attitude Control', 'Communications', 'Onboard Computer', 'Payload'].map((sys) => (
                      <div key={sys} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{sys}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <PrimaryButton>Save changes</PrimaryButton>
              </div>
            </Card>
          )}

          {activeTab === 'Audit log' && (
            <Card className="!p-0 overflow-hidden">
              <div className="p-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  Audit Log
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <tr>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                        TIMESTAMP
                      </th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                        EVENT
                      </th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                        OPERATOR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log, index) => (
                      <tr
                        key={index}
                        className="border-b"
                        style={{
                          backgroundColor: index % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-base)',
                          borderColor: 'var(--border-subtle)'
                        }}
                      >
                        <td className="px-5 py-3 font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                          {log.timestamp}
                        </td>
                        <td className="px-5 py-3 text-[12px]" style={{ color: 'var(--text-primary)' }}>
                          {log.event}
                        </td>
                        <td className="px-5 py-3 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                          {log.operator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
