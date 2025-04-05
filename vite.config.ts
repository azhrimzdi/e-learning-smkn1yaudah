import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'E-Learning SMKN 1 YAUDAH',
          description: 'Sistem pembelajaran online SMKN 1 YAUDAH',
        },
      },
    }),
  ],
});
