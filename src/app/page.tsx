import Image from 'next/image';
import AbrasiveForm from '@/components/AbrasiveForm';
import FeaturesAccordion from '@/components/FeaturesAccordion';
import type { Feature } from '@/components/FeaturesAccordion';
import Tabs from '@/components/Tabs';
import Reveal from '@/components/Reveal';
import StatCounter from '@/components/StatCounter';
import CatalogSection from '@/components/CatalogSection';
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
      imageSrc: '/images/nqn-grain-diagram.jpg',
      imageAlt: 'Керамическое зерно NQN — принцип самозатачивания под нагрузкой',
      imageWidth: 1089,
      imageHeight: 365,
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
      imageSrc: '/images/zernotgx3.jpg',
      imageAlt: 'Керамическое зерно последних поколений крупным планом',
      imageWidth: 700,
      imageHeight: 700,
      listItems: [
        'Большого диаметра (до 1200 шлифовальные и до 2000 мм отрезные)',
        'С премиальным составом и высоким содержанием (до 100%) керамического зерна последних поколений, высокопористые',
        'Сложные операции и трудные задачи, где обычные круги не справляются и нужна высокая производительность, эффективность, качество и стабильность обработки',
      ],
    },
  },
];

const stats = [
  { value: '20 лет', label: 'опыта в абразивном инструменте', counter: 20, suffix: ' лет' },
  { value: '13', label: 'категорий продукции', counter: 13, suffix: '' },
  { value: '3', label: 'завода-партнёра в Китае', counter: 3, suffix: '' },
  { value: 'До 2000 мм', label: 'диаметр отрезных кругов', counter: 2000, prefix: 'До ', suffix: ' мм' },
  { value: '1-2 дня', label: 'на коммерческое предложение', counter: null, suffix: '' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-ink text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 pb-14 pt-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-20 lg:pt-36">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent-light">
                Абразивный инструмент · станки · валки · метрология
              </span>
              <h1 className="mt-4 text-balance text-4xl font-black leading-[1.05] sm:text-5xl lg:text-[52px]">
                Один поставщик — весь цикл обработки металла
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-[17px]">
                От шлифовального круга до кованого прокатного валка и лабораторного твердомера.
                Официальный представитель трёх китайских производителей в России и СНГ — с подбором
                спецификации под вашу задачу.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#form" className="btn-primary">
                  Подобрать инструмент
                </a>
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/25 px-6 py-3.5 text-[15px] font-extrabold text-white transition hover:border-white/60"
                >
                  Смотреть каталог →
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-2xl lg:aspect-[5/4]">
              <Image
                src="/images/catalog/gd-grain-macro.jpg"
                alt="Керамическое зерно NQN под увеличением"
                fill
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-12">
                <p className="text-[13px] font-semibold text-white/85">
                  Керамическое зерно NQN последнего поколения — основа наших кругов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-black/5 bg-paper-soft">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {stats.map((s, i) => (
              <Reveal key={s.label} className="px-4 py-6 text-center" delay={i * 70}>
                <p className="text-xl font-black text-accent sm:text-2xl">
                  {s.counter === null ? (
                    s.value
                  ) : (
                    <StatCounter value={s.counter} prefix={s.prefix ?? ''} suffix={s.suffix} />
                  )}
                </p>
                <p className="mt-1 text-xs leading-snug text-ink/60 sm:text-[13px]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог: 13 категорий + поп-ап с галереей */}
      <CatalogSection />

      {/* Партнёры */}
      <section id="partners" className="scroll-mt-24 bg-paper-soft py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mb-9">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
              Наши производители
            </span>
            <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">
              Три завода. Одна точка входа в России
            </h2>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal>
              <article className="flex h-full flex-col rounded-xl2 border border-ink/10 bg-white p-7">
                <span className="mb-3.5 w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-accent-dark">
                  Абразивы
                </span>
                <h3 className="text-lg font-black text-ink">Jiangsu GD-Abrasives</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
                  Премиальные шлифовальные и отрезные круги с керамическим зерном NQN. 20 лет опыта,
                  испытания на предприятиях РФ и Китая показали стойкость выше Norton и Tyrolit.
                </p>
                <a
                  href="#applications"
                  className="mt-4 text-[13px] font-extrabold text-accent-dark transition hover:text-accent"
                >
                  Операции и спецификации →
                </a>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article
                id="rolls"
                className="flex h-full scroll-mt-28 flex-col rounded-xl2 border border-ink/10 bg-white p-7"
              >
                <span className="mb-3.5 w-fit rounded-full bg-[#2c5761]/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#2c5761]">
                  Валки
                </span>
                <h3 className="text-lg font-black text-ink">Changzhou COMPS</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
                  Кованые прокатные валки Cr2–Cr5, диаметр 20–1500 мм, вес до 50 т. Завод основан в
                  2017 году, инвестиции 16 млн юаней. Полный цикл — от ковки до финального контроля.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  <a
                    href="/Валки прокатные - лифлет (КИТАЙ).pdf"
                    download
                    className="text-[13px] font-extrabold text-accent-dark transition hover:text-accent"
                  >
                    Лифлет по валкам — PDF ↓
                  </a>
                </div>
              </article>
            </Reveal>

            <Reveal delay={180}>
              <article
                id="veiyee"
                className="flex h-full scroll-mt-28 flex-col rounded-xl2 border border-ink/10 bg-white p-7"
              >
                <span className="mb-3.5 w-fit rounded-full bg-[#7a5a0d]/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#7a5a0d]">
                  Метрология
                </span>
                <h3 className="text-lg font-black text-ink">Veiyee (LaiZhou Weiyi)</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
                  Твердомеры Роквелла, Бринелля и Виккерса, металлографические станки резки,
                  шлифовки-полировки и запрессовки образцов, оптико-эмиссионные спектрометры.
                  Завод в Лайчжоу с 2001 года, ISO 9001 с 2004, сертификат ЕС с 2011, экспорт в
                  70+ стран.
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink/45">
                  Национальное высокотехнологичное предприятие, 10 дочерних компаний. Среди
                  клиентов — Университет Цинхуа, отраслевые НИИ и более сотни автопроизводителей.
                </p>
                <a
                  href="#form"
                  className="mt-4 text-[13px] font-extrabold text-accent-dark transition hover:text-accent"
                >
                  Запросить оборудование →
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Подтверждено на объектах */}
      <section id="proof" className="scroll-mt-24 bg-paper py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
            <Reveal>
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                Подтверждено на объектах
              </span>
              <h2 className="mt-2 text-3xl font-black text-ink md:text-4xl">
                Не только каталог — реальные испытания
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
                На вальцешлифовальном участке одного из российских производителей валков круг
                GD-Abrasives показал коэффициент шлифования 50 против 30 у Norton — и обеспечил
                стабильный Ra 0,8 по всей длине валка 2000 мм. Производитель полностью перешёл на
                наши круги.
              </p>
              <div className="mt-6 flex flex-wrap gap-8">
                <div>
                  <p className="text-2xl font-black text-accent">
                    50 <span className="text-sm font-bold text-ink/50">vs 30</span>
                  </p>
                  <p className="text-xs text-ink/55">коэффициент шлифования GR</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-accent">2000 мм</p>
                  <p className="text-xs text-ink/55">стабильный Ra 0,8 по всей длине</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src="/images/exhibition.jpg"
                  alt="Стенд GD-Abrasives на отраслевой выставке"
                  width={1400}
                  height={788}
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="h-[170px] w-full rounded-xl2 object-cover"
                />
                <Image
                  src="/images/catalog/gd-wheels-spread.jpg"
                  alt="Линейка шлифовальных кругов GD-Abrasives"
                  width={900}
                  height={451}
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="h-[170px] w-full rounded-xl2 bg-paper-soft object-contain p-2"
                />
                <Image
                  src="/images/certificate.jpg"
                  alt="Сертификат соответствия"
                  width={900}
                  height={301}
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="h-[120px] w-full rounded-xl2 object-cover object-top"
                />
                <Image
                  src="/images/qc-1.jpg"
                  alt="Контроль геометрии круга при приёмке"
                  width={900}
                  height={1600}
                  sizes="(max-width: 1024px) 45vw, 260px"
                  className="h-[120px] w-full rounded-xl2 object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Операции / вкладки */}
      <section id="applications" className="scroll-mt-24 bg-paper-soft py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto mb-11 max-w-2xl text-center">
            <span className="section-eyebrow">Применение</span>
            <h2 className="text-3xl font-black text-ink sm:text-4xl">Круги для ваших операций</h2>
          </Reveal>
          <Reveal className="mx-auto max-w-6xl" delay={100}>
            <Tabs tabs={tabContent} />
          </Reveal>
        </div>
      </section>

      {/* Специализация */}
      <section id="specialization" className="scroll-mt-24 bg-paper py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto mb-11 max-w-2xl text-center">
            <span className="section-eyebrow">Специализация</span>
            <h2 className="text-3xl font-black text-ink sm:text-4xl">Чем мы отличаемся</h2>
          </Reveal>
          <div className="mx-auto max-w-4xl">
            <FeaturesAccordion features={features} />
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="scroll-mt-24 bg-paper-soft py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">О компании</span>
            <h2 className="mb-6 text-3xl font-black text-ink sm:text-4xl">ООО «ГД-Абрэзивс Рус»</h2>
            <p className="text-lg leading-relaxed text-ink/70">
              Официальный и эксклюзивный представитель Jiangsu Grinding Doctor Abrasives Co., Ltd.
              на территории России и стран СНГ. Поставляем круги премиальных высокопроизводительных
              спецификаций, кованые прокатные валки и лабораторное оборудование.
            </p>
            <div className="mt-9 rounded-r-xl2 border-l-4 border-accent bg-accent/5 p-6 text-left">
              <p className="text-lg font-medium text-ink">
                Имея 20-летний опыт работы с абразивным инструментом в ведущих мировых компаниях, мы
                объединились и теперь производим и поставляем самые эффективные решения для
                российской промышленности.
              </p>
              <p className="mt-3 text-sm font-semibold text-ink/60">
                Александр Мукосеев, к.т.н. — основатель
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black text-white md:text-[28px]">
                Подберём спецификацию под вашу задачу
              </h2>
              <p className="mt-2 text-[14.5px] text-white/60">
                Ответим с коммерческим предложением в течение 1–2 дней.
              </p>
            </div>
            <a href="#form" className="btn-primary shrink-0 px-8 py-4 text-[15.5px]">
              Оставить заявку
            </a>
          </div>
        </div>
      </section>

      {/* Заявка */}
      <section id="form" className="relative scroll-mt-24 overflow-hidden bg-paper py-16 md:py-20">
        <div className="container relative mx-auto px-4">
          <Reveal className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="section-eyebrow">Заявка</span>
              <h2 className="mb-3 text-3xl font-black text-ink sm:text-4xl">Оставить заявку</h2>
              <p className="text-ink/60">
                Заполните форму, и наши специалисты помогут подобрать оптимальные абразивные
                материалы для ваших задач.
              </p>
            </div>
            <div className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-xl sm:p-8">
              <AbrasiveForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="scroll-mt-24 bg-paper-soft py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-5xl text-center">
            <span className="section-eyebrow">Контакты</span>
            <h2 className="mb-11 text-3xl font-black text-ink sm:text-4xl">Наши контакты</h2>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="transition-transform duration-300 hover:scale-105">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">Телефон</h3>
                <a href="tel:+79122855111" className="text-accent-dark underline transition-colors hover:text-accent">
                  +7 (912) 285-51-11
                </a>
              </div>

              <div className="transition-transform duration-300 hover:scale-105">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">Email</h3>
                <a
                  href="mailto:thebestgrindingwheels@yandex.ru"
                  className="break-all text-accent-dark underline transition-colors hover:text-accent"
                >
                  thebestgrindingwheels@yandex.ru
                </a>
              </div>

              <div className="transition-transform duration-300 hover:scale-105">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">Адрес</h3>
                <p className="text-sm leading-relaxed text-ink/70">
                  620078, Екатеринбург,
                  <br />
                  ул. Студенческая, 42а
                </p>
              </div>

              <div className="transition-transform duration-300 hover:scale-105">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl2 bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">Реквизиты</h3>
                <p className="text-sm leading-relaxed text-ink/70">
                  ИНН 6670531625
                  <br />
                  КПП 667001001
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2 text-center text-white/60 sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm">
              ООО «ГД-Абрэзивс РУС» · ИНН 6670531625
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              620078, Екатеринбург, ул. Студенческая, 42а
            </p>
            <a href="/privacy" className="text-sm underline transition-colors hover:text-white">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
