import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command }: ConfigEnv) => {
  return {
    base: './',
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './main.ts'
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  }
})
