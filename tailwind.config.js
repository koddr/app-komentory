module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js'],
  darkMode: 'class', // or 'media'
  theme: {
    fontFamily: {
      sans: ['Inter', ...require('tailwindcss/defaultConfig').theme.fontFamily.sans],
    },
    extend: {},
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
};
