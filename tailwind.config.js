/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b9d8ff',
          300: '#8dbfff',
          400: '#5e9aff',
          500: '#3876ff',
          600: '#285af4',
          700: '#2148df',
          800: '#223cb4',
          900: '#22388d'
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        quickhire: {
          primary: '#285af4',
          secondary: '#111827',
          accent: '#0f766e',
          neutral: '#1f2937',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#e5e7eb',
          info: '#0ea5e9',
          success: '#16a34a',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      }
    ]
  }
};
