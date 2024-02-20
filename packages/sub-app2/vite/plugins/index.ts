import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { AutoImportDeps } from './autoImport'
import { AutoRegistryComponents } from './component'
import { ConfigQiankunPlugin } from './qiankun'
export function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImportDeps(),
    AutoRegistryComponents(),
    ConfigQiankunPlugin()
  ]

  return vitePlugins
}
