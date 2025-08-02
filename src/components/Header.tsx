'use client';

import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8 sm:h-10">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">VX Abrasive</span>
            </Link>
          </div>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className="text-sm xl:text-base font-medium text-gray-900 hover:text-primary transition-colors"
            >
              Главная
            </Link>
            <Link
              href="/catalog"
              className="text-sm xl:text-base font-medium text-gray-900 hover:text-primary transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/about"
              className="text-sm xl:text-base font-medium text-gray-900 hover:text-primary transition-colors"
            >
              О компании
            </Link>
            <Link
              href="/contacts"
              className="text-sm xl:text-base font-medium text-gray-900 hover:text-primary transition-colors"
            >
              Контакты
            </Link>
            <Link
              href="/request"
              className="btn-primary text-sm xl:text-base py-2 xl:py-3 px-4 xl:px-6"
            >
              Оставить заявку
            </Link>
          </nav>

          {/* Мобильное меню */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
} 