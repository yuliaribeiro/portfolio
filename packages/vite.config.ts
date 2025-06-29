import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
