'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import CategoryModal from './CategoryModal';
import { catalogCategories, type CatalogCategory } from '@/lib/catalogCategories';

/** Лифлет, который отдаём по кнопке «Весь каталог». */
const CATALOG_PDF = '/Лифлет по кругам GD-Abrasives 2026.pdf';

export default function CatalogSection() {
  const [openCategory, setOpenCategory] = useState<CatalogCategory | null>(null);

  return (
    <section id="catalog" className="scroll-mt-24 bg-paper py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                Полный каталог
              </span>
              <h2 className="mt-2 text-3xl font-black leading-tight text-ink md:text-4xl">
                13 категорий продукции — от круга до валка
              </h2>
            </div>
            <a
              href={CATALOG_PDF}
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-ink/10 px-5 py-3 text-sm font-extrabold text-ink transition hover:border-accent hover:text-accent"
            >
              <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M10 2a1 1 0 0 1 1 1v7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 10.586V3a1 1 0 0 1 1-1Z" />
                <path d="M3 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
              </svg>
              Весь каталог — PDF
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catalogCategories.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i, 7) * 45}>
              <button
                type="button"
                onClick={() => setOpenCategory(c)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-paper text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl hover:shadow-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {/* Обложка — примерно 40% высоты карточки */}
                <div className="relative h-[150px] shrink-0 overflow-hidden bg-gradient-to-br from-paper-soft to-[#ece7e0]">
                  {c.cover ? (
                    <Image
                      src={c.cover}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-4xl font-bold text-accent/20">{c.num}</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-md bg-white/85 px-2 py-1 font-mono text-[11px] font-bold text-accent backdrop-blur-sm">
                    {c.num}
                  </span>
                  {c.gallery.length > 0 && (
                    <span className="absolute bottom-3 right-3 rounded-md bg-ink/70 px-2 py-1 text-[11px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                      {c.gallery.length} фото
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[15.5px] font-extrabold leading-snug text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{c.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-mono text-[12px] font-semibold text-accent-dark">{c.range}</span>
                    <span
                      aria-hidden
                      className="text-sm font-bold text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      →
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {openCategory && (
        <CategoryModal category={openCategory} onClose={() => setOpenCategory(null)} />
      )}
    </section>
  );
}
