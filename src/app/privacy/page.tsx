import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика обработки персональных данных ООО «ГД-Абрэзивс РУС» (GD-Abrasives) в соответствии с 152-ФЗ.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mb-2">
          Политика конфиденциальности
        </h1>
        <p className="text-ink/50 text-sm mb-10">Действует с 18 августа 2026 г.</p>

        <div className="space-y-8 text-ink/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">1. Общие положения</h2>
            <p>
              Настоящая политика определяет порядок обработки персональных данных
              пользователей сайта ООО «ГД-Абрэзивс РУС» (далее — «Компания», «мы»),
              ИНН 6670531625, КПП 667001001, и разработана в соответствии с Федеральным
              законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p>
              Используя форму заявки на сайте, вы соглашаетесь с условиями настоящей
              политики. Если вы не согласны с её условиями, пожалуйста, не отправляйте
              форму и свяжитесь с нами напрямую по контактам, указанным на сайте.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">2. Какие данные мы собираем</h2>
            <p>При заполнении формы заявки на сайте мы собираем:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Имя</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона</li>
              <li>Название компании (если указано)</li>
              <li>Комментарии и технические детали запроса (если указаны)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">3. Цели обработки</h2>
            <p>Персональные данные обрабатываются исключительно для того, чтобы:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Связаться с вами для обработки заявки и подбора спецификации абразивного инструмента</li>
              <li>Подготовить и направить коммерческое предложение</li>
              <li>Ответить на вопросы, направленные через форму или указанные контакты</li>
            </ul>
            <p className="mt-2">
              Мы не используем ваши данные для рекламных рассылок без отдельного
              согласия и не передаём их третьим лицам, за исключением случаев,
              предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">4. Хранение и защита данных</h2>
            <p>
              Данные, отправленные через форму заявки, передаются по защищённому
              соединению (HTTPS) и поступают на корпоративную электронную почту
              Компании. Мы не храним данные заявок в отдельной базе данных на сайте.
              Доступ к письмам с заявками имеют только уполномоченные сотрудники
              Компании.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">5. Ваши права</h2>
            <p>
              Вы вправе в любой момент отозвать согласие на обработку персональных
              данных, а также запросить их уточнение, блокирование или уничтожение,
              направив запрос на электронную почту{' '}
              <a
                href="mailto:thebestgrindingwheels@yandex.ru"
                className="text-accent-dark underline hover:text-accent"
              >
                thebestgrindingwheels@yandex.ru
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">6. Файлы cookie</h2>
            <p>
              Сайт может использовать технически необходимые файлы cookie для
              корректной работы страниц. Мы не используем сторонние рекламные или
              трекинговые cookie без отдельного уведомления.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-ink mb-3">7. Контакты</h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <p className="mt-2">
              ООО «ГД-Абрэзивс РУС»
              <br />
              ИНН 6670531625, КПП 667001001
              <br />
              Email:{' '}
              <a
                href="mailto:thebestgrindingwheels@yandex.ru"
                className="text-accent-dark underline hover:text-accent"
              >
                thebestgrindingwheels@yandex.ru
              </a>
              <br />
              Телефон:{' '}
              <a href="tel:+79122855111" className="text-accent-dark underline hover:text-accent">
                +7 (912) 285-51-11
              </a>
            </p>
          </section>

          <p className="text-sm text-ink/50 italic pt-4 border-t border-black/10">
            Черновик документа, подготовлен по типовой структуре 152-ФЗ. Перед
            публикацией рекомендуем проверку юристом с учётом фактического процесса
            обработки данных в компании.
          </p>
        </div>
      </div>
    </main>
  );
}
