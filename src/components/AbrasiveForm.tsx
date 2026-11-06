'use client';

import { useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { OPERATION_OPTIONS } from '@/lib/formOptions';
import { catalogCategories } from '@/lib/catalogCategories';
import { FIELD_LIMITS } from '@/lib/inquiry';
import { useInquiry } from './InquiryContext';

const initialFormData = {
  material: '', operation: '', machine: '', name: '', email: '', phone: '',
  company: '', comments: '', consent: false, website: '',
};

const contactFields = [
  { name: 'name', label: 'Ваше имя', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Телефон', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'company', label: 'Компания', type: 'text', autoComplete: 'organization', required: false },
  { name: 'material', label: 'Материал детали', type: 'text', autoComplete: 'off', required: false },
  { name: 'machine', label: 'Оборудование', type: 'text', autoComplete: 'off', required: false },
] as const;

export default function AbrasiveForm() {
  const { selection, select } = useInquiry();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inFlight = useRef(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const category = catalogCategories.find((item) => item.slug === selection.category);
  const product = category?.gallery.find((item) => item.src === selection.product);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const nextValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    setFormData((previous) => ({ ...previous, [name]: nextValue }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setIsSubmitting(true);
    setStatus('idle');
    setSubmitMessage('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 65000);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...selection }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus('error');
        if (response.status === 429) {
          const seconds = Number(response.headers.get('retry-after'));
          setSubmitMessage(Number.isFinite(seconds) && seconds > 0
            ? `Лимит отправки заявок. Повторить можно примерно через ${Math.ceil(seconds / 60)} мин. Данные сохранены в форме; можно связаться с нами напрямую.`
            : 'Лимит отправки заявок. Данные сохранены в форме; можно связаться с нами напрямую.');
        } else if (result?.code === 'MAIL_NOT_CONFIGURED') {
          setSubmitMessage('Отправка через сайт временно недоступна. Данные сохранены в форме. Пожалуйста, свяжитесь с нами по email или телефону ниже.');
        } else if (result?.code === 'MAIL_TIMEOUT') {
          setSubmitMessage('Почтовый сервер не подтвердил отправку вовремя. Данные сохранены в форме. Перед повторной отправкой уточните получение заявки по телефону или email.');
        } else {
          setSubmitMessage(result?.message || 'Не удалось отправить заявку. Данные сохранены в форме. Попробуйте позже или свяжитесь с нами напрямую.');
        }
        return;
      }
      setStatus('success');
      setSubmitMessage('Спасибо! Заявка отправлена. Мы свяжемся с вами по указанным контактам.');
      setFormData(initialFormData);
      select({ category: '', product: '', source: '' });
    } catch {
      setStatus('error');
      setSubmitMessage('Ответ сервера не получен. Данные сохранены в форме. Если заявка срочная, свяжитесь с нами по телефону или email; перед повторной отправкой уточните, получена ли она.');
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative min-w-0 space-y-6" aria-busy={isSubmitting}>
      <fieldset disabled={isSubmitting} className="min-w-0 space-y-6">
        <legend className="sr-only">Заявка на подбор продукции</legend>
        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" value={formData.website} onChange={handleChange} maxLength={FIELD_LIMITS.website} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Категория продукции</label>
            <select id="category" name="category" value={selection.category} onChange={(event) => select({ category: event.target.value, product: '', source: '' })} className="form-input">
              <option value="">Помогите с подбором</option>
              {catalogCategories.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor="operation" className="mb-1 block text-sm font-medium text-gray-700">Операция (если известна)</label>
            <select id="operation" name="operation" value={formData.operation} onChange={handleChange} className="form-input">
              <option value="">Уточню в описании задачи</option>
              {OPERATION_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          {contactFields.map((field) => (
            <div key={field.name} className="min-w-0">
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-gray-700">{field.label}{field.required ? ' *' : ''}</label>
              <input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} required={field.required} value={formData[field.name]} onChange={handleChange} maxLength={FIELD_LIMITS[field.name]} className="form-input" />
            </div>
          ))}
        </div>
        {product && (
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 text-sm text-ink/80" role="status">
            <p>Выбран товар: <strong>{product.caption}</strong></p>
            <button type="button" onClick={() => select({ ...selection, product: '' })} className="mt-1 text-accent-dark underline">Убрать выбранный товар</button>
          </div>
        )}
        <div>
          <label htmlFor="comments" className="mb-1 block text-sm font-medium text-gray-700">Опишите задачу</label>
          <textarea id="comments" name="comments" rows={4} maxLength={FIELD_LIMITS.comments} placeholder="Размеры, материал, объём потребности и требования к обработке" value={formData.comments} onChange={handleChange} className="form-textarea" />
        </div>
        <p className="text-xs text-gray-600">* Обязательные поля. Для подбора достаточно описать вашу задачу — технические параметры можно уточнить с инженером.</p>
        <div className="flex items-start gap-2.5">
          <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required className="mt-1 h-4 w-4 shrink-0 rounded border-black/30 text-accent focus:ring-accent" />
          <label htmlFor="consent" className="text-sm text-gray-600">Даю согласие на <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-dark underline hover:text-accent">обработку персональных данных</a> в соответствии с политикой конфиденциальности</label>
        </div>
        <div className="text-center">
          <button type="submit" disabled={isSubmitting || !formData.consent} className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50 md:w-auto">{isSubmitting ? 'Отправка…' : 'Отправить заявку'}</button>
        </div>
      </fieldset>
      <p role="status" aria-live="polite" className={`text-center text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>{submitMessage}</p>
      <p className="text-center text-sm text-ink/70">
        Можно связаться напрямую:{' '}
        <a className="inline-block text-accent-dark underline" href="mailto:thebestgrindingwheels@yandex.ru">написать email</a>
        {' · '}
        <a className="inline-block text-accent-dark underline" href="tel:+79122855111">позвонить</a>
      </p>
    </form>
  );
}
