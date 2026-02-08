import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true, // Optional: if you want to process CSS in tests
    deps: {
      optimizer: {
        web: {
          include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
        },
      },
    },
  },
});