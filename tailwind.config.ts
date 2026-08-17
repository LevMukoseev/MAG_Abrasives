import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Тёмный индустриальный фон (hero, форма, футер) — по референсу mag-test.tilda.ws
        ink: {
          DEFAULT: '#242322',
          light: '#2f2e2c',
          muted: '#8f8b86',
        },
        // Светлый фон для контентных секций
        paper: {
          DEFAULT: '#ffffff',
          soft: '#f6f4f1',
        },
        // Основной акцент бренда — от логотипа GD-Abrasives и референса
        accent: {
          DEFAULT: '#e2492e',
          dark: '#c53a22',
          light: '#f2704f',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};
export default config;
