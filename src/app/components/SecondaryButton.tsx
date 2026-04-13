import { ButtonHTMLAttributes } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function SecondaryButton({ children, fullWidth, disabled, ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`
        h-[36px] px-[16px] rounded-[var(--radius-md)]
        font-medium text-[13px]
        border transition-all duration-100
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
      style={{
        borderColor: 'var(--border-strong)',
        color: 'var(--text-primary)',
        backgroundColor: disabled ? 'transparent' : 'transparent'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
