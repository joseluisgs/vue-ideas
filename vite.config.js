import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import ViteFonts from 'vite-plugin-fonts'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    ViteFonts({
      google: {
        families: ['Ubuntu', 'Montserrat', 'Fira Sans']
      }
    }),
    WindiCSS()
  ],
  test: {
    global: true,
    environment: 'happy-dom'
  }
})
