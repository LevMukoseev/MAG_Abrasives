'use client';

import React, { useState, FormEvent } from 'react';
import { OPERATION_OPTIONS } from '@/lib/formOptions';

const initialFormData = {
  material: '',
  operation: 'grinding_rolls',
  machine: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  comments: '',
  website: '', // honeypot: скрытое поле, реальные пользователи его не видят и не заполняют
};

type SubmitStatus = 'idle' | 'success' | 'error';

export default function AbrasiveForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setSubmitMessage('Спасибо за вашу заявку! Мы скоро с вами свяжемся.');
        setFormData(initialFormData);
      } else {
        const errorData = await response.json().catch(() => null);
        setStatus('error');
        setSubmitMessage(errorData?.message || 'Произошла ошибка. Попробуйте ещё раз.');
      }
    } catch {
      setStatus('error');
      setSubmitMessage('Произошла ошибка сети. Пожалуйста, проверьте ваше подключение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Honeypot: скрыто от людей стилями, но видно ботам, которые заполняют все поля подряд */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operation */}
        <div>
          <label htmlFor="operation" className="block text-sm font-medium text-gray-700 mb-1">
            Операция
          </label>
          <select
            id="operation"
            name="operation"
            value={formData.operation}
            onChange={handleChange}
            className="form-input"
            required
          >
            {OPERATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
            Материал
          </label>
          <input
            type="text"
            id="material"
            name="material"
            placeholder="Тип стали"
            value={formData.material}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Machine */}
        <div>
          <label htmlFor="machine" className="block text-sm font-medium text-gray-700 mb-1">
            Оборудование
          </label>
          <input
            type="text"
            id="machine"
            name="machine"
            placeholder="Модели станков"
            value={formData.machine}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
            autoComplete="email"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            required
            autoComplete="tel"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Компания
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-input"
            autoComplete="organization"
          />
        </div>
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Дополнительная информация
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          placeholder="Опишите детальней ваши требования или опишите задачу"
          value={formData.comments}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>{isSubmitting ? 'Отправка...' : 'Отправить заявку'}</span>
        </button>
      </div>

      {submitMessage && (
        <p
          role="status"
          aria-live="polite"
          className={`text-center text-sm mt-4 ${
            status === 'error' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}
