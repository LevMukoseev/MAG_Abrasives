import React from 'react';
import AbrasiveForm from '@/components/AbrasiveForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden min-h-[480px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/team.jpg"
            alt="Команда Abrasive Expert"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-end justify-end h-full pb-12">
          <div className="w-full sm:w-2/3 lg:w-1/3 xl:w-1/4 max-w-[25vw] bg-black/60 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in text-white drop-shadow-lg">
              Abrasive Expert
            </h1>
            <p className="text-2xl font-semibold mb-6 text-blue-200 animate-fade-in-delay drop-shadow">
              Подбор и доставка под ключ
            </p>
            <p className="text-xl mb-8 text-blue-100 animate-fade-in-delay drop-shadow">
              Высококачественные абразивные материалы для любых задач. Мы поможем подобрать оптимальное решение для вашего производства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <button className="btn-primary">
                <span>Оставить заявку</span>
              </button>
              <button className="btn-secondary">
                <span>Каталог продукции</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Высокая эффективность</h3>
              <p className="text-gray-600">
                Наши абразивные материалы обеспечивают максимальную производительность при минимальных затратах.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Все материалы проходят строгий контроль качества и соответствуют международным стандартам.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Глобальное присутствие</h3>
              <p className="text-gray-600">
                Мы работаем с клиентами по всему миру и обеспечиваем быструю доставку в любую точку.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Наша продукция</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Широкий ассортимент абразивных материалов и оборудования для различных задач обработки металла
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Абразивные круги */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/abrasive-wheel-1.svg"
                  alt="Абразивный круг для резки металла"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Абразивные круги для резки</h3>
                  <p className="text-sm text-gray-200">Высокоэффективные круги для точной резки металла</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/abrasive-wheel-2.svg"
                  alt="Абразивный круг для шлифовки"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Круги для шлифовки</h3>
                  <p className="text-sm text-gray-200">Профессиональные круги для финишной обработки</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/abrasive-wheel-3.svg"
                  alt="Абразивный круг для полировки"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Круги для полировки</h3>
                  <p className="text-sm text-gray-200">Специальные круги для зеркальной полировки</p>
                </div>
              </div>
            </div>

            {/* Станки */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/machine-1.svg"
                  alt="Шлифовальный станок"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Шлифовальные станки</h3>
                  <p className="text-sm text-gray-200">Профессиональное оборудование для шлифовки</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/machine-2.svg"
                  alt="Полировальный станок"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Полировальные станки</h3>
                  <p className="text-sm text-gray-200">Современное оборудование для полировки</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src="/images/products/machine-3.svg"
                  alt="Режущий станок"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Режущие станки</h3>
                  <p className="text-sm text-gray-200">Точное оборудование для резки металла</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Оставить заявку</h2>
              <p className="text-gray-600">
                Заполните форму, и наши специалисты помогут подобрать оптимальные абразивные материалы для ваших задач.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <AbrasiveForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/contact-pattern.svg"
            alt=""
            fill
            className="object-cover opacity-5"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                <p className="text-gray-600">+7 (999) 123-45-67</p>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@example.com</p>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Адрес</h3>
                <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 