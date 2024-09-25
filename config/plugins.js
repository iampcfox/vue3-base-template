import vue from '@vitejs/plugin-vue'
// import VueRouter from "unplugin-vue-router/vite";
// import Pages from "vite-plugin-pages";
// import Layouts from "vite-plugin-vue-layouts";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
// import { VueRouterAutoImports } from "unplugin-vue-router";
// import { visualizer } from 'rollup-plugin-visualizer';
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { unheadVueComposablesImports } from '@unhead/vue'

// vant
import { VantResolver } from '@vant/auto-import-resolver'

const createVitePlugins = (env) => {
  const plugins = [
    vue(),
    vueJsx(),
    // Pages({
    //   exclude: ["**/components/*.vue"],
    // }),
    // Layouts(),
    AutoImport({
      eslintrc: {
        enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './types/.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'pinia', 'vue-router', unheadVueComposablesImports],
      dirs: [
        // './src/hooks',
        './src/api/**', // all nested
        './src/store/module/**',
        './src/components/**',
        './src/composables/**' // all nested
      ],
      include: [/\.js$/, /\.vue$/, /\.vue\?vue/], // 设置需要导入的文件类型，检测 dirs 配置的路径的文件
      dts: './types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: './types/components.d.ts'
    }),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ]
  if (env.VITE_NODE_ENV === 'test') {
    plugins.push(
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    )
    // plugins.push(visualizer({ open: true }));
  }
  return plugins
}
export default createVitePlugins
