import { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({ children, fullWidth, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`
        h-[36px] px-[16px] rounded-[var(--radius-md)]
        font-semibold text-[13px] text-white
        transition-all duration-100
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:brightness-90'}
      `}
      style={{
        backgroundColor: 'var(--accent-primary)'
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
