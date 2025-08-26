import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/sports-imports/", // <-- nome exato do repositório
  build: {
    outDir: "dist",
  },
});