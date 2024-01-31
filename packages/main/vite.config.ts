import { ConfigEnv, defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import path from 'path'

export default defineConfig(({ command }: ConfigEnv) => {
  return {
    base: './',
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': '/src',
        '~': path.resolve(process.cwd())
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
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
})
