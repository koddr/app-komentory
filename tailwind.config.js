module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    fontFamily: {
      sans: ['Inter', ...require('tailwindcss/defaultConfig').theme.fontFamily.sans],
    },
    extend: {
      colors: {
        main: {
          light: '#80D5AA',
          DEFAULT: '#00AB55',
          dark: '#008743',
        },
        secondary: {
          DEFAULT: '#F6F4EF',
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
