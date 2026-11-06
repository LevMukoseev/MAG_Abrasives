const assert = require('node:assert/strict');
const test = require('node:test');
const { loadTypeScript } = require('./load-typescript.cjs');
const { validateInquiry, FIELD_LIMITS } = loadTypeScript('src/lib/inquiry.ts');
const { catalogCategories } = loadTypeScript('src/lib/catalogCategories.ts');
const legacy = { name: '  Клиент  ', email: 'client@example.com', phone: '+7 (912) 285-51-11', consent: true, operation: 'grinding_rolls' };

test('legacy clients remain supported and fields are normalized', () => {
  const result = validateInquiry(legacy);
  assert.equal(result.success, true);
  assert.equal(result.data.name, 'Клиент');
  assert.equal(result.data.category, '');
  assert.equal(validateInquiry({ ...legacy, operation: '' }).success, true);
});

test('all catalogue products resolve to server-owned captions', () => {
  for (const category of catalogCategories) {
    for (const product of category.gallery) {
      const result = validateInquiry({ ...legacy, category: category.slug, product: product.src, source: 'catalog', categoryTitle: 'forged', productCaption: 'forged' });
      assert.equal(result.success, true, category.slug);
      assert.equal(result.data.categoryTitle, category.title);
      assert.equal(result.data.productCaption, product.caption);
    }
  }
});

test('malformed, oversized and forged input is rejected', () => {
  const invalid = [null, [], 'input', {}, { ...legacy, consent: 'true' },
    { ...legacy, name: ['name'] }, { ...legacy, name: 'name\r\nBcc: victim@example.com' },
    { ...legacy, name: 'x'.repeat(FIELD_LIMITS.name + 1) },
    { ...legacy, email: 'bad@' }, { ...legacy, email: 'one@example.com,two@example.com' },
    { ...legacy, email: 'User<one@example.com>' }, { ...legacy, phone: 'letters' },
    { ...legacy, phone: '123' }, { ...legacy, phone: '+1234567890123456' },
    { ...legacy, category: 'forged' }, { ...legacy, operation: 'forged' },
    { ...legacy, product: 'https://example.com/forged.jpg' }, { ...legacy, source: 'forged' },
  ];
  for (const input of invalid) assert.equal(validateInquiry(input).success, false, JSON.stringify(input));
  assert.equal(validateInquiry({ ...legacy, comments: 'Первая строка\nВторая строка' }).success, true);
});

test('a product cannot be submitted under a different category', () => {
  const category = catalogCategories.find((entry) => entry.gallery.length);
  const other = catalogCategories.find((entry) => !entry.gallery.some((image) => image.src === category.gallery[0].src));
  assert.equal(validateInquiry({ ...legacy, category: other.slug, product: category.gallery[0].src }).success, false);
});
