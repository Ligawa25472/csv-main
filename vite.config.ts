import { defineConfig } from 'vite';
import angular from '@vitejs/plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: [
      'sb-59ddiiodz3i2.vercel.run',
      'localhost',
      '127.0.0.1',
    ],
  },
});
