import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Configuración del servidor local
  server: {
    host: true,         // permite acceder desde contenedores Docker
    port: 5173,         // puerto estándar de Vite
    hmr: {
      protocol: "ws",   // Hot Module Reload estable
      host: "localhost" // evita errores dentro de Docker
    }
  },

  // Para que Vitest pueda usar la misma config si lo necesita
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ['./vitest.setup.js'],
  }
});
