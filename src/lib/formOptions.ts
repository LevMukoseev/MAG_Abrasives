// Единый источник правды для опций формы заявки.
// Используется и на клиенте (рендер <select>), и на сервере (человекочитаемая метка в письме),
// чтобы значения никогда не расходились.

export const OPERATION_OPTIONS = [
  { value: 'grinding_rolls', label: 'Шлифовка прокатных валков' },
  { value: 'grinding_springs', label: 'Шлифовка торцев пружин' },
  { value: 'gear_grinding', label: 'Зубошлифование' },
  { value: 'cutting_discs', label: 'Отрезные круги большого размера' },
  { value: 'centerless_grinding', label: 'Бесцентровое шлифование' },
  { value: 'cylindrical_grinding', label: 'Круглое шлифование' },
  { value: 'surface_grinding', label: 'Плоское шлифование' },
  { value: 'roughing_wheels', label: 'Зачистные круги' },
  { value: 'other', label: 'Другое' },
] as const;

export const OPERATION_LABELS: Record<string, string> = Object.fromEntries(
  OPERATION_OPTIONS.map((o) => [o.value, o.label])
);
