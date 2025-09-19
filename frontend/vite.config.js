import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Aqui você expõe a variável do Vercel para o frontend
    "import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY": JSON.stringify(
      process.env.MERCADO_PAGO_PUBLIC_KEY
    ),
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.API_URL),
  },
});
