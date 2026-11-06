'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Задержка появления в мс — для лёгкого каскада соседних блоков. */
  delay?: number;
}

/** Показывает блок при входе в область просмотра с progressive enhancement. */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setAnimationReady(true);
      observer.disconnect();
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!animationReady || !el || !('animate' in el)) return;

    const animation = el.animate(
      [
        { opacity: 0, transform: 'translateY(1.5rem)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 700, delay, easing: 'ease-out', fill: 'both' }
    );
    return () => animation.cancel();
  }, [animationReady, delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
