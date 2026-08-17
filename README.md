# GD-Abrasives

Сайт-визитка и лендинг с формой заявок для GD-Abrasives (ООО «ГД-Абрэзивс РУС») — официального
представителя Jiangsu Grinding Doctor Abrasives Co., Ltd. в России и СНГ.

## Стек

- Next.js 15 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Nodemailer (отправка заявок на email, без базы данных)

## Установка

```bash
npm install
cp .env.example .env.local   # заполните SMTP_* и MAIL_TO
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

См. `.env.example`:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` — для отправки заявок с формы.
- `NEXT_PUBLIC_SITE_URL` — публичный домен сайта, используется в metadata/OG/sitemap/robots.

## Сборка

```bash
npm run build
npm start
```

## Структура

- `src/app/page.tsx` — единственная страница (лендинг), собранная из секций.
- `src/app/api/submit-form/route.ts` — обработчик формы заявки (валидация, honeypot, rate limit, отправка письма).
- `src/components/` — UI-компоненты.
- `src/lib/tabContent.tsx` — контент вкладок «Применение».
- `src/lib/formOptions.ts` — общий список операций для формы и письма.
