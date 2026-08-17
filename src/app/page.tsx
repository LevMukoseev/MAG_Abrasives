import Image from 'next/image';
import AbrasiveForm from '@/components/AbrasiveForm';
import FeaturesAccordion from '@/components/FeaturesAccordion';
import type { Feature } from '@/components/FeaturesAccordion';
import Tabs from '@/components/Tabs';
import { tabContent } from '@/lib/tabContent';

const features: Feature[] = [
  {
    id: 'tech',
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Передовые технологии',
    initialText: 'Максимальная производительность при минимальных затратах.',
    details: {
      imageSrc: '/images/abrasive-detailed.png',
      imageAlt: 'Детальное изображение абразивного круга',
      imageWidth: 1772,
      imageHeight: 607,
      galleryImages: [
        { src: '/images/zernotgx.jpg', alt: 'Керамическое зерно TGX' },
        { src: '/images/zernonqn.jpg', alt: 'Керамическое зерно NQN' },
        { src: '/images/zernotgx1.jpg', alt: 'Керамическое зерно TGX крупным планом' },
        { src: '/images/zernopa.jpg', alt: 'Керамическое зерно PA' },
        { src: '/images/zernotgx3.jpg', alt: 'Керамическое зерно TGX образец 3' },
      ],
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
      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Гарантия качества',
    initialText: 'Строгий контроль качества и соответствие международным стандартам.',
    details: {
      imageSrc: '/images/quality-garant.png',
      imageAlt: 'Гарантия качества продукции',
      imageWidth: 926,
      imageHeight: 434,
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
    id: 'specialization-item',
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    ),
    title: 'Наша специализация',
    initialText:
      'Работаем с кругами большого диаметра с высоким содержанием керамического зерна последних поколений для самых сложных и требовательных задач.',
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
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section id="hero" className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/shapka.png"
            alt="Команда GD-Abrasives"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Официальный представитель в РФ и СНГ</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 text-balance">
              GD-Abrasives
            </h1>
            <p className="text-xl sm:text-2xl font-bold mb-4 text-white/90">
              Лучшие шлифовальные круги
            </p>
            <p className="text-base sm:text-lg mb-8 text-white/70 max-w-xl">
              Премиальные шлифовальные круги для любых задач: от прокатных валков до отрезки
              большого диаметра. Подбор спецификации и поставка 1–3 месяца.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#form" className="btn-primary">
                Оставить заявку
              </a>
              <a href="#specialization" className="btn-secondary">
                Наша специализация
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About / Partnership */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-10 flex justify-center">
              <Image
                src="/images/logo.jpg"
                alt="GD-Abrasives"
                width={170}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-lg text-ink/70 leading-relaxed">
              Наша компания является официальным и эксклюзивным представителем производителя кругов
              Jiangsu Grinding Doctor Abrasives Co., Ltd. (GD-Abrasives) на территории России и стран СНГ.
              <br />
              В результате нашего сотрудничества мы готовы предложить вам круги премиальных
              высокопроизводительных спецификаций для различных операций.
            </p>
            <div className="mt-12 bg-accent/5 border-l-4 border-accent text-left p-6 rounded-r-xl2">
              <p className="text-lg font-medium text-ink">
                Имея 20-летний опыт работы с абразивным инструментом в ведущих мировых компаниях, мы
                объединились и теперь производим и поставляем самые эффективные решения для Российской
                промышленности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization / Features */}
      <section id="specialization" className="py-20 bg-paper-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-eyebrow">Специализация</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">Чем мы отличаемся</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <FeaturesAccordion features={features} />
          </div>
        </div>
      </section>

      {/* Applications / Tabs */}
      <section id="applications" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-eyebrow">Применение</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">
              Круги для ваших операций
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <Tabs tabs={tabContent} />
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="form" className="py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(226,73,46,0.12),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-eyebrow">Заявка</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">Оставить заявку</h2>
              <p className="text-white/70">
                Заполните форму, и наши специалисты помогут подобрать оптимальные абразивные
                материалы для ваших задач.
              </p>
            </div>
            <div className="bg-white rounded-xl2 shadow-xl p-6 sm:p-8">
              <AbrasiveForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-eyebrow">Контакты</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-12">Наши контакты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl2 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Телефон</h3>
                <a href="tel:+79122855111" className="text-accent-dark underline hover:text-accent transition-colors">
                  +7 (912) 285-51-11
                </a>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl2 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Email</h3>
                <a
                  href="mailto:thebestgrindingwheels@yandex.ru"
                  className="text-accent-dark underline hover:text-accent transition-colors"
                >
                  thebestgrindingwheels@yandex.ru
                </a>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl2 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-ink mb-2">
                  <p>
                    ИНН: <span className="font-normal text-ink/70">6670531625</span>
                  </p>
                  <p>
                    КПП: <span className="font-normal text-ink/70">667001001</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-ink">
        <div className="container mx-auto px-4">
          <div className="text-center text-white/60 space-y-1">
            <p className="text-sm">ООО «ГД-Абрэзивс РУС»</p>
            <p className="text-sm">LLC &quot;GD-Abrasives RUS&quot;</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
