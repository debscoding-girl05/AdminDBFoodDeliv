import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['@radix-ui/react-slot', 'react', 'tailwind-merge', 'clsx'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
