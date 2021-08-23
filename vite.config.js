import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'vite-plugin-fonts';

export default defineConfig({
  resolve: {
    alias: {
      __: resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
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
  ],
});
