export const createProxy = (env) => {
  const proxyUrl = env.VITE_PROXY ? JSON.parse(env.VITE_PROXY) : []
  const proxy = {}
  proxyUrl.forEach(([prefix, target]) => {
    proxy[prefix] = {
      target, // The target URL to proxy to.
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), '')
    }
  })
  return {
    host: '0.0.0.0',
    port: '5591',
    strictPort: false,
    open: true,
    hmr: {
      overlay: false
    },
    proxy
  }
}
