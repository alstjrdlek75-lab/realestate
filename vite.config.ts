import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
    viteSingleFile(),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
