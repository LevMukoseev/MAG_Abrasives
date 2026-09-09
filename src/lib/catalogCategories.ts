/**
 * 13 категорий продукции для каталожной сетки на главной.
 *
 * Источники фото (все — материалы заводов-поставщиков, переданные заказчиком):
 *  - gd-*  — лифлеты и каталоги поставщиков: Jiangsu GD-Abrasives (круги),
 *            REZZ / Zhengzhou Ruizuan (алмаз и CBN), Veiyee / LaiZhou Weiyi
 *            (лаборатория), каталог дисковых пил
 *  - bd-*  — Lion King / Buddies Abrasives (buddiesabrasives.com)
 *
 * Если у категории не задан `cover`, карточка и поп-ап рисуют типографскую
 * заглушку — намеренно, чтобы не подставлять неподходящий чужой товар.
 * Сейчас без фото осталась только «Кремниевая суспензия».
 */

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface CatalogCategory {
  slug: string;
  num: string;
  title: string;
  desc: string;
  /** Диапазон размеров — короткая строка для угла карточки. */
  range: string;
  /** Обложка карточки. Если не задана — рисуется заглушка. */
  cover?: string;
  /** Чей это товар — подпись в поп-апе. */
  brand: string;
  /** Тезисы для поп-апа. */
  bullets: string[];
  gallery: GalleryImage[];
}

const C = '/images/catalog/';

export const catalogCategories: CatalogCategory[] = [
  {
    slug: 'grinding-wheels',
    num: '01',
    title: 'Шлифовальные круги',
    desc: 'Валки, пружины, зубошлифование, бесцентровое и круглое шлифование',
    range: 'D3–1400 мм',
    cover: C + 'gd-wheels-spread.jpg',
    brand: 'Jiangsu GD-Abrasives',
    bullets: [
      'До 100% керамического зерна последних поколений NQN и Vortex',
      'Высокопористые структуры, связки на бакелитовой и керамической основе',
      'Подбор спецификации под станок, материал и требуемую Ra',
      'Круги большого диаметра — до 1200 мм шлифовальные',
    ],
    gallery: [
      { src: C + 'gd-wheels-spread.jpg', caption: 'Линейка шлифовальных кругов GD-Abrasives' },
      { src: C + 'gd-wheels-row.jpg', caption: 'Круги разных спецификаций и диаметров' },
      { src: C + 'gd-wheels-color.jpg', caption: 'Круги на керамической связке' },
      { src: C + 'gd-grain-macro.jpg', caption: 'Керамическое зерно NQN под увеличением' },
      { src: C + 'gd-gear-wheels.jpg', caption: 'Круги для профильного шлифования зубчатых колёс' },
    ],
  },
  {
    slug: 'cutoff-large',
    num: '02',
    title: 'Отрезные круги большого диаметра',
    desc: 'Армированные круги для металлургии — MDCO и LDCO',
    range: 'D500–2000 мм',
    cover: C + 'gd-cutoff-1600.jpg',
    brand: 'Jiangsu GD-Abrasives',
    bullets: [
      'Испытания на ведущих меткомбинатах РФ: стойкость выше Tyrolit и Norton',
      'Типовые диаметры 800, 1000, 1250 и 1500 мм — серийные поставки',
      'Подбор под температуру реза, сечение детали и кинематику станка',
      'Чистый рез без заусенцев на высокой скорости резания',
    ],
    gallery: [
      { src: C + 'gd-cutoff-1600.jpg', caption: 'Отрезной круг 1600×15×230, 5NZ20SBF-COLD' },
      { src: C + 'gd-cutoff-1270.jpg', caption: 'Отрезной круг 1270×13,5×127, 100 м/с' },
      { src: '/images/cut-pendulum.jpg', caption: 'Схема: маятниковая отрезка' },
      { src: '/images/cut-throughfeed.jpg', caption: 'Схема: резка на проход' },
      { src: '/images/cut-rotation.jpg', caption: 'Схема: резка с вращением детали' },
      { src: '/images/cut-oscillation.jpg', caption: 'Схема: резка с горизонтальной осцилляцией' },
    ],
  },
  {
    slug: 'diamond-cbn',
    num: '03',
    title: 'Алмазный и эльборовый инструмент',
    desc: 'Производство и заточка осевого режущего инструмента',
    range: 'по запросу',
    cover: C + 'gd-diamond-wheels.jpg',
    brand: 'REZZ (Zhengzhou Ruizuan Diamond Tools)',
    bullets: [
      'Круги из синтетического алмаза и КНБ (эльбор) для производства и заточки осевого инструмента',
      'Связки: смоляная, керамическая (vitrified), металлическая, гальваническая',
      'Керамическая связка — самая «острая» из суперабразивных, для прецизионного шлифования PCD, PCBN, CVD, MCD, ND',
      'Подбор концентрации и зернистости под операцию и материал',
    ],
    gallery: [
      { src: C + 'gd-diamond-wheels.jpg', caption: 'Линейка алмазных и CBN кругов REZZ' },
      { src: C + 'gd-cbn-wheels.jpg', caption: 'Круги на керамической связке (vitrified bond)' },
      { src: '/images/cbn-wheel.jpg', caption: 'Эльборовый круг' },
      { src: C + 'gd-gear-wheels.jpg', caption: 'Круги для профильного шлифования' },
    ],
  },
  {
    slug: 'diamond-rolls',
    num: '04',
    title: 'Алмазные ролики и карандаши',
    desc: 'Правка профиля шлифовальных кругов',
    range: 'по запросу',
    cover: C + 'gd-dressers.jpg',
    brand: 'REZZ (Zhengzhou Ruizuan Diamond Tools)',
    bullets: [
      'Однокристальные алмазные карандаши (single-point dresser)',
      'Многокристальные карандаши (multi-point dresser)',
      'Алмазные фасонные ножи для формообразования (forming knife)',
      'Профильные правящие ролики — профиль по чертежу заказчика',
    ],
    gallery: [
      { src: C + 'gd-dressers.jpg', caption: 'Линейка правящего алмазного инструмента REZZ' },
      { src: C + 'bd-cup-wheel.jpg', caption: 'Алмазный чашечный круг' },
      { src: C + 'bd-mini-diamond.jpg', caption: 'Алмазный отрезной круг малого диаметра' },
    ],
  },
  {
    slug: 'discs-125-400',
    num: '05',
    title: 'Круги 125–400 мм',
    desc: 'Отрезные и зачистные — для УШМ и стационарных станков',
    range: '125–180–230–400 мм',
    cover: C + 'bd-cutting-disc.jpg',
    brand: 'Lion King / Buddies Abrasives',
    bullets: [
      'Отрезные, зачистные и комбинированные круги',
      'Керамическое зерно, цирконий, корунд — под сталь, нержавейку, цветной металл',
      'Ультратонкие круги от 1,0 мм для чистого реза без прижогов',
      'Отрезные 400 мм и зачистные 230 мм протестированы — уровень премиального Tyrolit',
      'Держим складской запас в России',
    ],
    gallery: [
      { src: C + 'bd-cutting-disc.jpg', caption: 'Отрезной круг 125×1,0 по стали' },
      { src: C + 'bd-grinding-disc.jpg', caption: 'Зачистной круг 180×6,0 по нержавейке' },
      { src: C + 'bd-ceramic-disc.jpg', caption: 'Круг на керамическом зерне' },
      { src: C + 'bd-discs-stack.jpg', caption: 'Зачистные круги в упаковке' },
      { src: C + 'bd-mesh-disc.jpg', caption: 'Круги на сетчатой основе' },
    ],
  },
  {
    slug: 'non-woven',
    num: '06',
    title: 'Нетканые абразивы',
    desc: 'Нейлоновое волокно для финишной доводки, лепестковые круги',
    range: 'по запросу',
    cover: C + 'bd-nonwoven-strip.jpg',
    brand: 'Lion King / Buddies Abrasives',
    bullets: [
      'Зачистные круги из нейлонового волокна — снятие окалины, ржавчины, краски',
      'Лепестковые круги: корунд, цирконий, керамика',
      'Фибровые круги и поролоновые шлифблоки',
      'Финишная доводка без изменения геометрии детали',
      'Нетканка и лепестковые круги — складской запас в России',
    ],
    gallery: [
      { src: C + 'bd-nonwoven-strip.jpg', caption: 'Нетканые зачистные круги' },
      { src: C + 'bd-flap-disc.jpg', caption: 'Лепестковый круг, корунд' },
      { src: C + 'bd-flap-disc-2.jpg', caption: 'Лепестковый круг, цирконий' },
      { src: C + 'bd-flap-wheel.jpg', caption: 'Лепестковый круг на оправке' },
      { src: C + 'bd-fiber-disc.jpg', caption: 'Фибровые круги, корунд' },
      { src: C + 'bd-fiber-disc-2.jpg', caption: 'Фибровые круги, цирконий' },
      { src: C + 'bd-sponge-pads.jpg', caption: 'Поролоновые шлифблоки' },
    ],
  },
  {
    slug: 'belts-paper',
    num: '07',
    title: 'Шлифленты и шкурка',
    desc: 'Ленты шлифовальные, шкурка в рулонах и листах',
    range: 'по запросу',
    cover: C + 'bd-belt-ceramic.jpg',
    brand: 'Lion King / Buddies Abrasives',
    bullets: [
      'Ленты бесконечные: керамика, цирконий, корунд, карбид кремния',
      'Шкурка в рулонах, листах и на липучке',
      'Под литьё, нержавейку, ножевое производство, аэрокосмос',
      'Размеры лент — под ваш станок',
    ],
    gallery: [
      { src: C + 'bd-belt-ceramic.jpg', caption: 'Керамическая шлифлента' },
      { src: C + 'bd-belt-ao.jpg', caption: 'Корундовая шлифлента' },
      { src: C + 'bd-belt-scene.jpg', caption: 'Ленточное шлифование в работе' },
      { src: C + 'bd-cloth-roll.jpg', caption: 'Шлифшкурка на тканевой основе, рулон' },
      { src: C + 'bd-paper-roll.jpg', caption: 'Шкурка в рулоне, белый корунд' },
      { src: C + 'bd-sandpaper.jpg', caption: 'Водостойкая шкурка, карбид кремния' },
      { src: C + 'bd-velcro-disc.jpg', caption: 'Круги на липучке' },
      { src: C + 'bd-adhesive-roll.jpg', caption: 'Самоклеящийся рулон' },
    ],
  },
  {
    slug: 'lab',
    num: '08',
    title: 'Лабораторные расходники',
    desc: 'Расходники и оборудование для металлургических лабораторий',
    range: 'по запросу',
    cover: C + 'gd-lab-machine.jpg',
    brand: 'Veiyee (LaiZhou Weiyi)',
    bullets: [
      'Отрезные неармированные круги для металлографической резки',
      'Шлифовальные и полировальные диски, диски из шкурки',
      'Суспензии, смолы и расходники для запрессовки образцов',
      'Станки для резки, шлифовки-полировки и запрессовки образцов',
    ],
    gallery: [
      { src: C + 'gd-lab-machine.jpg', caption: 'Металлографический отрезной станок Weiyi' },
      { src: C + 'gd-lab-consum.jpg', caption: 'Расходники для запрессовки образцов' },
    ],
  },
  {
    slug: 'milling-cutters',
    num: '09',
    title: 'Дисковые фрезы',
    desc: 'Твердосплавные дисковые фрезы по металлу',
    range: '20–300 мм',
    cover: C + 'gd-saw-hss.jpg',
    brand: 'Партнёрские производства',
    bullets: [
      'Твердосплавные дисковые фрезы 20–300 мм',
      'Под отрезные и пазовые операции',
      'Геометрия зуба — под материал заготовки',
      'Переточка и обслуживание инструмента',
    ],
    gallery: [
      { src: C + 'gd-saw-hss.jpg', caption: 'Дисковый режущий инструмент по металлу' },
      { src: C + 'bd-saw-alu.jpg', caption: 'Диск по цветному металлу' },
    ],
  },
  {
    slug: 'circular-saws',
    num: '10',
    title: 'Циркулярные пилы',
    desc: 'HSS, CERMET и твердосплав по металлу',
    range: '100–2000 мм',
    cover: C + 'gd-saw-hss.jpg',
    brand: 'Партнёрские производства',
    bullets: [
      'Пилы HSS, CERMET и с твердосплавными напайками',
      'Диаметры 100–2000 мм: холодная резка, сухая резка, фрикционные и сегментные пилы',
      'По чёрным и цветным металлам',
      'Переточка и обслуживание',
    ],
    gallery: [
      { src: C + 'gd-saw-hss.jpg', caption: 'Циркулярные пилы HSS по металлу' },
      { src: C + 'bd-saw-alu.jpg', caption: 'Диск по цветному металлу' },
      { src: C + 'bd-diamond-wheel.jpg', caption: 'Алмазный отрезной диск, сплошная кромка' },
      { src: C + 'bd-diamond-tools.jpg', caption: 'Линейка отрезного и шлифовального инструмента' },
    ],
  },
  {
    slug: 'mill-rolls',
    num: '11',
    title: 'Прокатные валки',
    desc: 'Кованые валки Cr2–Cr5, поставка напрямую с завода',
    range: 'до 1500 мм',
    cover: '/images/roll-photo-2.jpg',
    brand: 'Changzhou COMPS Metallurgical Equipment',
    bullets: [
      'Кованые рабочие и опорные валки, хром 2–5%',
      'Диаметр 20–1500 мм, вес до 50 тонн',
      'Полный цикл: ковка → закалка и отпуск → глубокая заморозка → механообработка → контроль',
      'Завод основан в 2017 году, инвестиции 16 млн юаней',
    ],
    gallery: [
      { src: '/images/roll-photo-2.jpg', caption: 'Кованый прокатный валок' },
      { src: C + 'gd-rolls-steel.jpg', caption: 'Валки после механической обработки' },
      { src: C + 'gd-roll-grinding.jpg', caption: 'Вальцешлифовальный участок' },
      { src: C + 'gd-roll-wheel.jpg', caption: 'Круг для шлифовки валков' },
      { src: C + 'gd-roll-wheel-2.jpg', caption: 'Круг для шлифовки валков, крупно' },
    ],
  },
  {
    slug: 'silica-suspension',
    num: '12',
    title: 'Кремниевая суспензия',
    desc: 'На водной основе, для литейных форм',
    range: 'для литья',
    brand: 'Партнёрские производства',
    bullets: [
      'Кремнезоль на водной основе для точного литья',
      'Связующее для керамических оболочковых форм',
      'Поставка в таре под объём производства',
    ],
    gallery: [],
  },
  {
    slug: 'casting-machines',
    num: '13',
    title: 'Станки для обдирки литья',
    desc: 'Отрезные и зачистные станки под литейное производство',
    range: 'по запросу',
    cover: C + 'bd-machine-rotary.jpg',
    brand: 'Lion King / Buddies Abrasives',
    bullets: [
      'Отрезные станки для удаления литников и прибылей',
      'Роторные и полузакрытые модели, в т.ч. ZDB-400',
      'Под конвейерное литейное производство',
      'Подбор круга к станку — в одном комплекте',
    ],
    gallery: [
      { src: C + 'bd-machine-rotary.jpg', caption: 'Роторный отрезной станок для литья' },
      { src: C + 'bd-machine-zdb400.jpg', caption: 'Полузакрытый отрезной станок ZDB-400' },
    ],
  },
];
