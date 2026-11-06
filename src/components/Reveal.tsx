import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retained for call-site compatibility; reveal animation is disabled. */
  delay?: number;
}

/** Renders content immediately without scroll-triggered movement or fading. */
export default function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className}>{children}</div>;
}
