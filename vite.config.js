import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "https://ecommerce-c1r1.onrender.com",
      "/category": "https://ecommerce-c1r1.onrender.com",
      "/product": "https://ecommerce-c1r1.onrender.com",
    },
  },
});
