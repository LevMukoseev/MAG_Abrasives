import { catalogCategories } from './catalogCategories';
import { OPERATION_OPTIONS } from './formOptions';

export const FIELD_LIMITS = {
  name: 100, email: 254, phone: 40, company: 200, material: 200, machine: 200,
  comments: 2000, website: 200, category: 80, product: 300, source: 40, operation: 80,
} as const;

type InquiryField = keyof typeof FIELD_LIMITS;
export type Inquiry = Record<InquiryField, string> & {
  consent: true;
  categoryTitle: string;
  productCaption: string;
};
export type InquiryValidationResult =
  | { success: true; data: Inquiry }
  | { success: false; message: string };

function hasInvalidControls(value: string, multiline: boolean): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    if (multiline && (code === 9 || code === 10 || code === 13)) return false;
    return code < 32 || (code >= 127 && code <= 159) || code === 0x2028 || code === 0x2029;
  });
}

export function validateInquiry(body: unknown): InquiryValidationResult {
  const invalid = (message: string): InquiryValidationResult => ({ success: false, message });
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return invalid('Некорректный формат данных');
  }
  const input = body as Record<string, unknown>;
  const fields = {} as Record<InquiryField, string>;
  for (const field of Object.keys(FIELD_LIMITS) as InquiryField[]) {
    if (!Object.prototype.hasOwnProperty.call(input, field)) {
      fields[field] = '';
      continue;
    }
    const value = input[field];
    if (typeof value !== 'string') return invalid(`Поле ${field} должно быть строкой`);
    if (value.length > FIELD_LIMITS[field]) return invalid(`Поле ${field} слишком длинное`);
    if (hasInvalidControls(value, field === 'comments')) {
      return invalid(`Поле ${field} содержит недопустимые символы`);
    }
    fields[field] = value.trim();
  }
  if (!fields.name || !fields.email || !fields.phone) return invalid('Заполните обязательные поля');
  if (!/^[^\s@<>(),;:"\\[\]]+@[^\s@<>(),;:"\\[\]]+\.[^\s@<>(),;:"\\[\]]+$/.test(fields.email)) return invalid('Некорректный email');
  const digits = fields.phone.replace(/\D/g, '');
  if (!/^[+()\-.\s\d]+$/.test(fields.phone) || digits.length < 7 || digits.length > 15) {
    return invalid('Некорректный телефон');
  }
  if (input.consent !== true) return invalid('Необходимо согласие на обработку персональных данных');
  if (fields.operation && !OPERATION_OPTIONS.some(({ value }) => value === fields.operation)) {
    return invalid('Некорректная операция');
  }
  const category = catalogCategories.find(({ slug }) => slug === fields.category);
  if (fields.category && !category) return invalid('Некорректная категория');
  const product = category?.gallery.find(({ src }) => src === fields.product);
  if (fields.product && !product) return invalid('Товар не найден в выбранной категории');
  if (fields.source && fields.source !== 'catalog') return invalid('Некорректный источник заявки');
  return {
    success: true,
    data: { ...fields, consent: true, categoryTitle: category?.title ?? '', productCaption: product?.caption ?? '' },
  };
}
