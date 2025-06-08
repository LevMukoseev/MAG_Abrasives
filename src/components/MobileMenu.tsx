'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-2xl border-t border-gray-100">
          <nav className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="/catalog"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              О компании
            </Link>
            <Link
              href="/contacts"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Контакты
            </Link>
            <div className="pt-2">
              <Link
                href="/request"
                className="block w-full px-4 py-2 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Оставить заявку
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
} 