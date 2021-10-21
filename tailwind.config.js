module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', ...require('tailwindcss/defaultConfig').theme.fontFamily.sans],
    },
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-15': 'span 15 / span 15',
        'span-23': 'span 23 / span 23',
      },
      colors: {
        main: {
          lighter: '#BFEAD4',
          light: '#80D5AA',
          DEFAULT: '#00AB55',
          dark: '#008743',
          darker: '#006231',
        },
        secondary: {
          lighter: '#FDFCFB',
          light: '#F6F4EF',
          DEFAULT: '#E3DDCF',
          dark: '#626268',
          darker: '#3E3E41',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
