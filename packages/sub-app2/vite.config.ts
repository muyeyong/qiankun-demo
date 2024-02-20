import { ConfigEnv, defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import path from 'path'
import { APP_HOST, APP_PORT } from './vite/constant'

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
    server: {
      cors: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      port: APP_PORT,
      hmr: { host: APP_HOST, port: APP_PORT }
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
