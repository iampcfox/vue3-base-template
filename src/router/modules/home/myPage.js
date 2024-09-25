// 分享页在路由文件的sharePage/index.js，不在这里！

const routes = [
  {
    path: '/myPage',
    name: 'myPage',
    meta: {
      title: '我的页面',
      keywords: '我的页面'
    },
    children: [
      // {
      //   path: 'create',
      //   // name: 'create',
      //   meta: {
      //     title: '新增',
      //     keepAlive: false,
      //     keywords: '新增'
      //   },
      //   component: () => import('@/pages/myPage/create.vue')
      // },
      // {
      //   path: 'canvasEdit',
      //   // name: 'canvasEdit',
      //   meta: {
      //     title: '画布1',
      //     keepAlive: false,
      //     keywords: '画布1',
      //     TableLayout: 'emptyLayout'
      //   },
      //   component: () => import('@/pages/myPage/core/canvasLayout.vue')
      // }
    ]
  }
]

export default routes
