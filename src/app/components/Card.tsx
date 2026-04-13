import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  elevated?: boolean;
  className?: string;
}

export function Card({ children, elevated, className }: CardProps) {
  return (
    <div
      className={`
        p-[20px] border
        ${elevated ? 'rounded-[var(--radius-xl)]' : 'rounded-[var(--radius-lg)]'}
        ${className || ''}
      `}
      style={{
        backgroundColor: elevated ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        borderColor: elevated ? 'var(--border-strong)' : 'var(--border-subtle)',
        boxShadow: elevated ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none'
      }}
    >
      {children}
    </div>
  );
}
