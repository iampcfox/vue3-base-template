import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './config/plugins.js'
import createdBuild from './config/build'
import { createProxy } from './config/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    base: env.VITE_BASE,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        api: fileURLToPath(new URL('./src/api', import.meta.url)),
        utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
        store: fileURLToPath(new URL('./src/store', import.meta.url)),
        pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
        assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
        components: fileURLToPath(new URL('./src/components', import.meta.url)),
        composables: fileURLToPath(new URL('./src/composables', import.meta.url))
      }
    },
    build: createdBuild(env),
    server: createProxy(env)
  }
})
