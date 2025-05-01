import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://aether-x.onrender.com" // Cambia esto por tu subdominio real si es diferente
    }
  }
});
