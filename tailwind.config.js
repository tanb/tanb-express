/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      screens: {
        // https://material.angular.io/cdk/layout/overview に従う
        xs: { max: '599.98px' },
        sm: { min: '600px', max: '959.98px' },
        md: { min: '960px', max: '1279.98px' },
        lg: { min: '1280px', max: '1919.98px' },
        xl: { min: '1920px' },
        'lt-md': { max: '959px' },
        'gt-xs': { min: '600px' },
        'gt-sm': { min: '960px' },
        'gt-md': { min: '1280px' },
        'gt-lg': { min: '1920px' },
      },
      fontFamily: {
        'noto-sans': ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        primaryDisabled: 'var(--color-primary-disabled)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
};
