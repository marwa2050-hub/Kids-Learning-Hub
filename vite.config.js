import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  base: "/Kids-Learning-Hub/"  // <-- اضافه شد برای دیپلوی روی GitHub Pages
});
