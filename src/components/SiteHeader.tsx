'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Пункты меню и якоря, на которые они реально ведут.
 * Каждый href обязан соответствовать существующей секции на главной —
 * см. src/app/page.tsx (id="catalog" / "rolls" / "veiyee" / "about" / "contacts").
 */
const NAV_LINKS = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#rolls', label: 'Валки (Китай)' },
  { href: '#veiyee', label: 'Лаборатория Veiyee' },
  { href: '#about', label: 'О компании' },
  { href: '#contacts', label: 'Контакты' },
];

/**
 * Единственный хедер сайта: fixed поверх контента, прозрачный на тёмном hero
 * главной страницы и сплошной на остальном скролле или на страницах без hero
 * (например /privacy) — там начинаем со сплошного фона сразу, чтобы не
 * потерять читаемость на светлом фоне.
 */
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(true);

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) {
      // На страницах без hero (например /privacy) хедер всегда сплошной —
      // isSolid уже true по умолчанию, дополнительный setState не нужен.
      return;
    }

    // rAF, а не синхронный setState — IntersectionObserver-коллбэк не
    // гарантированно приходит мгновенно (в проде видели задержки), а
    // requestAnimationFrame всё равно успевает до отрисовки кадра, так что
    // "мигания" сплошного хедера над hero не будет.
    const frame = requestAnimationFrame(() => setIsSolid(false));
    const observer = new IntersectionObserver(
      ([entry]) => setIsSolid(!entry.isIntersecting),
      { rootMargin: '-100px 0px 0px 0px' }
    );
    observer.observe(heroElement);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isSolid ? 'bg-ink shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Утилитарная строка с реквизитами — только на широких экранах */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-[12.5px] text-white/60">
          <span>620078, Екатеринбург, ул. Студенческая, 42а</span>
          <div className="flex items-center gap-3">
            <span>ИНН 6670531625</span>
            <span aria-hidden className="text-white/25">
              |
            </span>
            <a href="tel:+79122855111" className="transition hover:text-white">
              +7 912 28 55 111
            </a>
            <span aria-hidden className="text-white/25">
              |
            </span>
            <a href="mailto:TheBestGrindingWheels@yandex.ru" className="transition hover:text-white">
              TheBestGrindingWheels@yandex.ru
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#hero" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/images/logo.jpg"
              alt="GD-Abrasives"
              width={36}
              height={33}
              className="object-contain"
            />
            <span className="leading-none">
              <span className="block text-lg font-extrabold tracking-tight text-white">
                GD-Abrasives
              </span>
              <span className="mt-0.5 hidden text-[10.5px] tracking-wide text-white/50 sm:block">
                официальный представитель в РФ и СНГ
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-bold text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#form" className="btn-primary hidden shrink-0 px-5 py-2.5 text-sm xl:inline-flex">
            Оставить заявку
          </a>

          <button
            type="button"
            className="p-2 text-white xl:hidden"
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col gap-1 rounded-b-xl2 bg-ink pb-4 xl:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-2.5 font-semibold text-white/85 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a href="#form" onClick={() => setIsOpen(false)} className="btn-primary mt-2 text-center">
              Оставить заявку
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
