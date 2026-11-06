'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { CatalogCategory } from '@/lib/catalogCategories';
import { useInquiry } from './InquiryContext';

interface CategoryModalProps {
  category: CatalogCategory;
  onClose: () => void;
}

/**
 * Поп-ап категории: галерея фото товаров + тезисы по категории.
 * Закрывается по Esc, клику по подложке и кнопке. Стрелки листают галерею.
 */
export default function CategoryModal({ category, onClose }: CategoryModalProps) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { select } = useInquiry();
  const total = category.gallery.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (total > 1 && e.key === 'ArrowRight') next();
      if (total > 1 && e.key === 'ArrowLeft') prev();
    };
    dialog?.addEventListener('keydown', onKey);
    return () => dialog?.removeEventListener('keydown', onKey);
  }, [next, prev, total]);

  // Блокируем скролл страницы под модалкой и возвращаем фокус в диалог.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const active = category.gallery[index];

  const requestSpecification = () => {
    select({ category: category.slug, product: active?.src || '', source: 'catalog' });
    onClose();
    requestAnimationFrame(() => {
      document.getElementById('form')?.scrollIntoView({ behavior: 'auto', block: 'start' });
      document.getElementById('category')?.focus({ preventScroll: true });
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={category.title}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-4xl overflow-y-auto rounded-xl2 border-0 bg-paper p-0 text-ink shadow-2xl [overflow-wrap:anywhere] backdrop:bg-ink/70"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-lg font-bold text-white transition hover:bg-ink"
        >
          ×
        </button>

        <div className="grid gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Галерея */}
          <div className="rounded-t-xl2 bg-paper-soft p-4 md:rounded-l-xl2 md:rounded-tr-none md:p-6">
            {active ? (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                  <Image
                    key={active.src}
                    src={active.src}
                    alt={active.caption}
                    fill
                    sizes="(max-width: 768px) 92vw, 520px"
                    className="object-contain p-2"
                  />
                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Предыдущее фото"
                        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-white transition hover:bg-ink"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Следующее фото"
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-white transition hover:bg-ink"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                <p aria-live="polite" className="mt-3 min-h-[2.5rem] text-sm text-ink/60">{index + 1} / {total} · {active.caption}</p>

                {total > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {category.gallery.map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Фото ${i + 1}: ${img.caption}`}
                        aria-current={i === index}
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-white transition ${
                          i === index ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={img.src} alt="" fill sizes="56px" className="object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-lg border border-dashed border-ink/[0.15] bg-white px-6 text-center">
                <span className="font-mono text-3xl font-bold text-accent/30">{category.num}</span>
                <p className="mt-3 text-sm font-bold text-ink/70">Фотоматериал готовим</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/50">
                  Пришлём фото и спецификации по этой категории в ответ на заявку.
                </p>
              </div>
            )}
          </div>

          {/* Описание */}
          <div className="flex min-w-0 flex-col p-5 md:p-7">
            <span className="font-mono text-xs font-bold tracking-wider text-accent">
              {category.num} · {category.range}
            </span>
            <h3 className="mt-2 text-2xl font-black leading-tight text-ink">{category.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{category.desc}</p>

            <ul className="mt-5 space-y-2.5">
              {category.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-ink/45">
              Производитель: <span className="font-semibold text-ink/60">{category.brand}</span>
            </p>

            {category.deliveryNote && <p className="mt-3 text-sm text-ink/70">{category.deliveryNote}</p>}

            <button
              type="button"
              onClick={requestSpecification}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark md:mt-auto"
            >
              Запросить цену и спецификацию
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
