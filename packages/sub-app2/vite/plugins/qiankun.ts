import MicroVitePlugin from 'vite-plugin-qiankun'
import { APP_NAME } from '../constant'
const isProd = process.env.NODE_ENV === 'production'

export const ConfigQiankunPlugin = () => {
  return MicroVitePlugin(APP_NAME, {
    useDevMode: !isProd
  })
}
