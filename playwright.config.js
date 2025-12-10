import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  // Ejecutar el servidor automáticamente
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },

  use: {
    headless: true,       // recomendado en CI
    baseURL: 'http://localhost:5173',
  },
});
