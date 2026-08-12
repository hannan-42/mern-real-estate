import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    proxy: {
      "/server": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
