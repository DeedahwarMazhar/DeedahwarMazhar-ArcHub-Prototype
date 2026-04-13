import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, Search } from 'lucide-react';
import { Card } from '../components/Card';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { TextInput } from '../components/TextInput';

const satellites = [
  { id: 1, name: 'SAT-7 Sentinel-Alpha', mission: 'Earth Observation', launch: '2023-04-15' },
  { id: 2, name: 'SAT-12 CommStar-B', mission: 'Communications', launch: '2024-01-22' },
  { id: 3, name: 'SAT-19 WeatherEye-3', mission: 'Meteorological', launch: '2023-11-08' },
  { id: 4, name: 'SAT-25 NavBeacon-5', mission: 'Navigation', launch: '2024-03-14' },
  { id: 5, name: 'SAT-31 ScienceLab-2', mission: 'Scientific Research', launch: '2023-08-19' },
  { id: 6, name: 'SAT-44 DefenseNet-7', mission: 'Defense', launch: '2024-02-05' }
];

const subsystems = [
  { id: 'power', name: 'Power', components: 12 },
  { id: 'thermal', name: 'Thermal', components: 8 },
  { id: 'attitude', name: 'Attitude Control', components: 15 },
  { id: 'comms', name: 'Communications', components: 6 },
  { id: 'computer', name: 'Onboard Computer', components: 4 },
  { id: 'payload', name: 'Payload', components: 10 },
  { id: 'propulsion', name: 'Propulsion', components: 7 }
];

export function SatelliteConfiguration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSatellite, setSelectedSatellite] = useState<number | null>(null);
  const [enabledSubsystems, setEnabledSubsystems] = useState<Set<string>>(
    new Set(['power', 'thermal', 'attitude', 'comms', 'computer', 'payload'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [reliabilityThreshold, setReliabilityThreshold] = useState(60);

  const steps = [
    'Select satellite',
    'Configure subsystem groups',
    'Set alert thresholds',
    'Review & launch'
  ];

  const toggleSubsystem = (id: string) => {
    const newSet = new Set(enabledSubsystems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setEnabledSubsystems(newSet);
  };

  const filteredSatellites = satellites.filter((sat) =>
    sat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Whether Continue is allowed on the current step
  const canContinue = !(step === 1 && selectedSatellite === null);

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Left Sidebar - Steps */}
      <div
        className="w-[200px] border-r p-8"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="space-y-6">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;

            return (
              <div key={stepNum} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: isActive || isCompleted ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                    border: isActive ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)'
                  }}
                >
                  {isCompleted ? (
                    <Check size={14} style={{ color: '#FFFFFF' }} />
                  ) : (
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: isActive ? '#FFFFFF' : 'var(--text-muted)' }}
                    >
                      {stepNum}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className="text-[13px] font-medium leading-tight"
                    style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12">
        <div className="max-w-[900px] mx-auto">

          {/* Step 1: Select Satellite */}
          {step === 1 && (
            <div>
              <h2 className="text-[24px] font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Select your satellite
              </h2>
              <p className="text-[13px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                Choose the satellite you want to monitor
              </p>

              <div className="mb-6">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <TextInput
                    placeholder="Search satellites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {filteredSatellites.map((sat) => {
                  const isSelected = selectedSatellite === sat.id;
                  return (
                    <div
                      key={sat.id}
                      onClick={() => setSelectedSatellite(sat.id)}
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-primary-muted)' : 'var(--bg-surface)',
                        border: isSelected
                          ? '1.5px solid var(--accent-primary)'
                          : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                    >
                      <h3
                        className="font-semibold text-[14px] mb-1"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {sat.name}
                      </h3>
                      <p className="text-[12px] mb-1" style={{ color: 'var(--text-muted)' }}>
                        {sat.mission}
                      </p>
                      <p className="font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                        {sat.launch}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Inline hint when nothing selected */}
              {selectedSatellite === null && (
                <p className="text-[12px] text-right" style={{ color: 'var(--text-muted)' }}>
                  Select a satellite above to continue
                </p>
              )}
            </div>
          )}

          {/* Step 2: Configure Subsystems */}
          {step === 2 && (
            <div>
              <h2 className="text-[24px] font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Configure subsystem groups
              </h2>
              <p className="text-[13px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                Enable the subsystem groups you want to monitor
              </p>

              <div className="space-y-3 mb-8">
                {subsystems.map((subsys) => {
                  const isEnabled = enabledSubsystems.has(subsys.id);
                  return (
                    <div
                      key={subsys.id}
                      className="flex items-center justify-between p-4 cursor-pointer transition-all duration-100"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                        opacity: isEnabled ? 1 : 0.45
                      }}
                      onClick={() => toggleSubsystem(subsys.id)}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => toggleSubsystem(subsys.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                        <div>
                          <p className="text-[14px] font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                            {subsys.name}
                          </p>
                          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                            {subsys.components} components
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Set Thresholds */}
          {step === 3 && (
            <div>
              <h2 className="text-[24px] font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Set alert thresholds
              </h2>
              <p className="text-[13px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                Configure minimum thresholds for fault detection
              </p>

              <div className="space-y-6 mb-8">
                <Card>
                  <h3 className="text-[14px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Fault confidence threshold
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full mb-3"
                  />
                  <div className="flex justify-between text-[12px] font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>0%</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{confidenceThreshold}%</span>
                    <span style={{ color: 'var(--text-muted)' }}>100%</span>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-[14px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Reliability minimum
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={reliabilityThreshold}
                    onChange={(e) => setReliabilityThreshold(Number(e.target.value))}
                    className="w-full mb-3"
                  />
                  <div className="flex justify-between text-[12px] font-mono">
                    <span style={{ color: 'var(--text-muted)' }}>0%</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{reliabilityThreshold}%</span>
                    <span style={{ color: 'var(--text-muted)' }}>100%</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Review & Launch */}
          {step === 4 && (
            <div>
              <h2 className="text-[24px] font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Review & launch
              </h2>
              <p className="text-[13px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                Confirm your configuration and launch the dashboard
              </p>

              <Card className="mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                      Selected satellite
                    </p>
                    <p className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
                      {satellites.find((s) => s.id === selectedSatellite)?.name || 'None'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                      Enabled subsystems
                    </p>
                    <p className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
                      {Array.from(enabledSubsystems)
                        .map((id) => subsystems.find((s) => s.id === id)?.name)
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                      Thresholds
                    </p>
                    <p className="text-[14px]" style={{ color: 'var(--text-primary)' }}>
                      Confidence: {confidenceThreshold}% · Reliability: {reliabilityThreshold}%
                    </p>
                  </div>
                </div>
              </Card>

              <PrimaryButton fullWidth onClick={() => navigate('/dashboard')}>
                Launch dashboard
              </PrimaryButton>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <SecondaryButton onClick={() => setStep(step - 1)}>
                Back
              </SecondaryButton>
            ) : (
              <div />
            )}

            {step < 4 && (
              <PrimaryButton
                onClick={() => canContinue && setStep(step + 1)}
                disabled={!canContinue}
                style={{
                  opacity: canContinue ? 1 : 0.35,
                  cursor: canContinue ? 'pointer' : 'not-allowed',
                  pointerEvents: canContinue ? 'auto' : 'none',
                }}
              >
                Continue
              </PrimaryButton>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
