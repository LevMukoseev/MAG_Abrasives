'use client';

import React, { useState, FormEvent } from 'react';

export default function AbrasiveForm() {
  const [formData, setFormData] = useState({
    material: '',
    operation: 'grinding_rolls',
    machine: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
        setSubmitMessage('Спасибо за вашу заявку! Мы скоро с вами свяжемся.');
        setFormData({
            material: '',
            operation: 'grinding_rolls',
            machine: '',
            name: '',
            email: '',
            phone: '',
            company: '',
            comments: '',
        });
      } else {
        const errorData = await response.json();
        setSubmitMessage(`Произошла ошибка: ${errorData.message || 'Попробуйте еще раз.'}`);
      }
    } catch (error) {
      setSubmitMessage('Произошла ошибка сети. Пожалуйста, проверьте ваше подключение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operation */}
        <div>
          <label htmlFor="operation" className="block text-sm font-medium text-gray-700 mb-1">Операция</label>
          <select
            id="operation"
            name="operation"
            value={formData.operation}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="grinding_rolls">Шлифовка прокатных валков</option>
            <option value="grinding_springs">Шлифовка торцев пружин</option>
            <option value="gear_grinding">Зубошлифование</option>
            <option value="cutting_discs">Отрезные круги большого размера</option>
            <option value="other">Другое</option>
          </select>
        </div>

        {/* Material */}
        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Материал</label>
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
          <label htmlFor="machine" className="block text-sm font-medium text-gray-700 mb-1">Оборудование</label>
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Company */}
        <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
            <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-input"
            />
        </div>
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Дополнительная информация</label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          placeholder="Опишите детальней ваши требования или опишите задачу"
          value={formData.comments}
          onChange={handleChange}
          className="form-textarea"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full md:w-auto disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </div>

      {submitMessage && (
        <p className={`text-center text-sm mt-4 ${submitMessage.includes('ошибка') ? 'text-red-600' : 'text-green-600'}`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
} 