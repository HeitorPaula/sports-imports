
  import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sports-imports/', // Caminho correto para o GitHub Pages
  build: {
    outDir: 'build', // Onde o Vite vai gerar os arquivos
  },
});
