import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function TextInput({ error, className, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={`
          h-[36px] px-[12px] rounded-[var(--radius-md)]
          text-[13px] font-normal
          border transition-all duration-100
          focus:outline-none
          ${error ? 'border-[var(--status-critical)]' : ''}
          ${className || ''}
        `}
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: error ? 'var(--status-critical)' : 'var(--border-subtle)',
          color: 'var(--text-primary)'
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }
        }}
        {...props}
      />
      {error && (
        <span className="text-[12px]" style={{ color: 'var(--status-critical)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
