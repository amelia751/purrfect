import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keeps the REACT_APP_* names already configured in Netlify working.
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: {
    port: 5180,
  },
  build: {
    outDir: 'dist',
  },
});
