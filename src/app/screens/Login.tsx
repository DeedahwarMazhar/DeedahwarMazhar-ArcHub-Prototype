import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Satellite } from 'lucide-react';
import { Card } from '../components/Card';
import { TextInput } from '../components/TextInput';
import { PrimaryButton } from '../components/PrimaryButton';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigate('/onboarding');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.05
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] px-6">
        <Card elevated className="!p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--accent-primary-muted)' }}
            >
              <Satellite size={32} style={{ color: 'var(--accent-primary)' }} strokeWidth={1.5} />
            </div>
            <h1
              className="font-display text-[24px] font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              ORBITWATCH
            </h1>
            <p className="text-[13px] text-center" style={{ color: 'var(--text-secondary)' }}>
              Reliability-aware fault monitoring for satellite operations
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <TextInput
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PrimaryButton fullWidth onClick={handleSignIn}>
            Sign in
          </PrimaryButton>

          <button
            className="w-full text-center mt-4 text-[13px]"
            style={{ color: 'var(--text-muted)' }}
          >
            Forgot password?
          </button>

          {/* Footer */}
          <p
            className="text-[11px] text-center mt-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Secure access. All sessions are logged.
          </p>
        </Card>
      </div>
    </div>
  );
}
