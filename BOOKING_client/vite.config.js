import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  //Configuracion para que Funciones la dependencia o configuracion "proxy: "url" "
  server: {
    proxy: {
      '/api': {
        target: "https://proyecto-integrador-enyoi.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/^\/api/', ''),
      },
    },
  },
});
