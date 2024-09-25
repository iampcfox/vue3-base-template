import dayjs from 'dayjs'

const createdBuild = (env) => {
  return {
    // minify: "terser",
    target: 'es2015',
    cssTarget: 'chrome80',
    outDir:  env.VITE_OUT_DIR,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        // 生产环境时移除console
        // eslint-disable-next-line camelcase
        drop_console: true,
        // eslint-disable-next-line camelcase
        drop_debugger: true
      }
    }
    // rollupOptions: {
    //     output: {
    //         chunkFileNames: "static/js/[name]-[hash].js",
    //         entryFileNames: "static/js/[name]-[hash].js",
    //         assetFileNames: "static/[ext]/[name]-[hash].[ext]",
    //         manualChunks(id: string) {
    //             if (id.includes("node_modules")) {
    //                 const packName = id.toString().split("node_modules/")[1].split("/")[0].toString();
    //                 if (packName.includes("vue")) {
    //                     return "vue";
    //                 } else if (packName.includes("element-plus")) {
    //                     return "element-plus";
    //                 } else {
    //                     return "vendor";
    //                 }
    //             }
    //         }
    //     }
    // }
  }
}

export default createdBuild
