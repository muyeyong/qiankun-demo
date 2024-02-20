/**
 * @name AutoImportDeps
 * @Author oushengqiang
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'

export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'autoTypes/auto-imports.d.ts',
    imports: [
      'vue',
      'pinia',
      'vue-router',
      {
        '@vueuse/core': []
      }
    ],
    resolvers: []
  })
}
