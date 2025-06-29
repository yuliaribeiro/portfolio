import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },

  server: {
    port: 3000,
    open: true,
  },
})
