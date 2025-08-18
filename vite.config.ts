import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import md from "vite-plugin-md";
import mdx from "@mdx-js/rollup";
// import remarkGfm from "remark-gfm";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    md(),
    mdx({
      providerImportSource: "@mdx-js/react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
