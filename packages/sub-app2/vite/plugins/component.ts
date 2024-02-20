import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
export const AutoRegistryComponents = () => {
  return Components({
    dirs: ['src/components'],
    extensions: ['vue'],
    deep: true,
    dts: 'autoTypes/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    importPathTransform: (v) => v,
    allowOverrides: false,
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      AntDesignVueResolver({
        importStyle: 'less'
      })
    ]
  })
}
