'use client';

import { useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#specialization', label: 'Специализация' },
  { href: '#applications', label: 'Применение' },
  { href: '#contacts', label: 'Контакты' },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 bg-ink">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="GD-Abrasives"
              width={36}
              height={33}
              className="object-contain"
            />
            <span className="text-white font-extrabold text-lg tracking-tight">
              GD-Abrasives
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#form" className="btn-primary py-2.5 px-5 text-sm">
              Оставить заявку
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-white"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-2 py-2.5 text-white/85 font-semibold rounded-lg hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#form"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-2 text-center"
            >
              Оставить заявку
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
