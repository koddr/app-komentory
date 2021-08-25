import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'

export default defineConfig({
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
    },
  },
  plugins: [
    // Add plugin for Google Fonts.
    ViteFonts({
      google: {
        families: [
          {
            name: 'Inter',
            styles: 'wght@400;600;800',
          },
        ],
      },
    }),
    // Add plugin for Vue.js.
    vue(),
  ],
})
