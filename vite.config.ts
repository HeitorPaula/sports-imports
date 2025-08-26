import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Substitua "sports-imports" pelo nome exato do seu repositório
export default defineConfig({
  plugins: [react()],
  base: "/sports-imports/",
});