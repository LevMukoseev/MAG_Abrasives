'use client';

import { useEffect, useState } from 'react';

/**
 * Компактная закреплённая панель, которая появляется, как только hero-секция
 * уходит за пределы экрана. Самодостаточна: сама следит за #hero через
 * IntersectionObserver, не требует пропсов/рефов от родителя.
 */
export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { rootMargin: '-100px 0px 0px 0px' }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-ink/95 backdrop-blur-sm shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <span className="text-sm sm:text-base md:text-lg font-extrabold text-white">
            GD-Abrasives
          </span>
          <a href="#form" className="btn-primary py-2 px-4 text-xs sm:text-sm">
            Оставить заявку
          </a>
        </div>
      </div>
    </div>
  );
}
