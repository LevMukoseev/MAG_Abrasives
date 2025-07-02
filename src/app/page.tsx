'use client';

import React, { useState, useRef, useEffect } from 'react';
import AbrasiveForm from '@/components/AbrasiveForm';
import Image from 'next/image';
import FeatureCard from '@/components/FeatureCard';
import Tabs from '@/components/Tabs';
import { tabContent } from '@/lib/tabContent';
import StickyHeader from '@/components/StickyHeader';

const features = [
  {
    id: 'tech',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Передовые технологии',
    initialText: 'Максимальная производительность при минимальных затратах.',
    details: {
      imageSrc: '/images/abrasive-detailed.png',
      imageAlt: 'Детальное изображение абразивного круга',
      listItems: [
        'Новейшие мировые разработки по зерну, связке, технологии изготовления – всё это мы применяем в кругах.',
        'Наша цель – дать лучшее решение по операции из того, что может быть на данный момент в мире.',
        'Результаты испытаний на многих предприятиях в России и Китае показывают превосходство нашей продукции над мировыми брендами.',
      ],
    },
  },
  {
    id: 'quality',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Гарантия качества',
    initialText: 'Строгий контроль качества и соответствие международным стандартам.',
    details: {
      imageSrc: '/images/quality-garant.png',
      imageAlt: 'Гарантия качества продукции',
      listItems: [
        'Сокращение времени цикла и себестоимости продукции',
        'Подбор спецификаций кругов под задачу',
        'Новейшие мировые разработки по зерну, связкам и структуре',
        'Оперативная поставка (1-3 месяца), возможна авиа-доставка',
        'Оптимальная цена с фиксацией в рублях',
        'Выставление КП в течение 1-2 дней',
      ],
    },
  },
  {
    id: 'specialization',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    ),
    title: 'Наша специализация',
    initialText: 'Работаем с кругами большого диаметра с высоким содержанием керамического зерна последних поколений для самых сложных и требовательных задач.',
    details: {
      listItems: [
        'Большого диаметра (до 1200 шлифовальные и до 2000 мм отрезные)',
        'С премиальным составом и высоким содержанием (до 100%) керамического зерна последних поколений, высокопористые',
        'Сложные операции и трудные задачи, где обычные круги не справляются и нужна высокая производительность, эффективность, качество и стабильность обработки',
      ],
    },
  },
];

export default function Home() {
  const [openFeatureId, setOpenFeatureId] = useState<string | null>('tech');
  const formRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const handleToggleFeature = (id: string) => {
    setOpenFeatureId(prevId => (prevId === id ? null : id));
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(!entry.isIntersecting);
      },
      { rootMargin: '-100px 0px 0px 0px' }
    );

    observer.observe(heroElement);

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      <StickyHeader isVisible={isHeaderVisible} onScrollToForm={handleScrollToForm} />
      {/* Hero Section */}
      <section ref={heroRef} className="relative text-white bg-blue-800 md:bg-transparent md:py-20 md:min-h-[480px] md:flex md:items-end overflow-hidden">
        {/* Unified Hero Image for all devices */}
        <div className="absolute inset-0">
          <Image
            src="/images/abrasives-randompng.png"
            alt="Команда Abrasive Expert"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 py-12 mx-auto md:pb-12 md:pt-0">
          <div className="flex flex-col items-center text-center md:items-end md:text-left">
            <div className="w-full max-w-lg p-8 rounded-2xl md:bg-black/60 md:shadow-2xl md:max-w-[30vw] lg:max-w-[25vw]">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in text-white drop-shadow-lg">
                Abrasive Expert
              </h1>
              <p className="text-2xl font-semibold mb-6 text-blue-200 animate-fade-in-delay drop-shadow">
                Лучшие шлифовальные круги
              </p>
              <p className="text-xl mb-8 text-blue-100 animate-fade-in-delay drop-shadow">
                Абразив Эксперт в партнерстве с производителем кругов из Китая – Jiangsu Grinding Doctor Abrasives Co., Ltd. (GD-Abrasives) предлагает премиальные высокопроизводительные спецификации шлифовальных кругов для различных операций.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2 justify-center md:justify-start">
                <button className="btn-primary" onClick={handleScrollToForm}>
                  <span>Оставить заявку</span>
                </button>
                <button className="btn-secondary">
                  <span>Наша специализация</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ведущее партнерство</h2>
            <div className="mt-8 mb-10 flex justify-center">
              <Image
                src="/images/logo-united.png"
                alt="Партнерство Abrasive Expert и GD-Abrasives"
                width={250}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Абразив Эксперт в партнерстве с производителем кругов из Китая – Jiangsu Grinding Doctor Abrasives Co., Ltd. (GD-Abrasives) предлагает премиальные высокопроизводительные спецификации шлифовальных кругов для различных операций.
            </p>
            <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 text-left p-6 rounded-r-lg">
              <p className="text-lg font-medium text-blue-800">
                Имея 20-летний опыт работы с абразивным инструментом в ведущих мировых компаниях, мы объединились и теперь производим и поставляем самые эффективные решения для Российской промышленности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                icon={feature.icon}
                title={feature.title}
                initialText={feature.initialText}
                details={feature.details}
                isOpen={openFeatureId === feature.id}
                onToggle={() => handleToggleFeature(feature.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs tabs={tabContent} />
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section ref={formRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Оставить заявку</h2>
              <p className="text-gray-600">
                Заполните форму, и наши специалисты помогут подобрать оптимальные абразивные материалы для ваших задач.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
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
            alt="Декоративный фон"
            fill
            className="object-cover opacity-5"
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Телефон</h3>
                <p className="text-gray-600">+7 (912) 285-51-11</p>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">thebestgrindingwheels@yandex.ru</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 