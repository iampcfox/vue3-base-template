import { createRouter, createWebHistory } from 'vue-router'
import home from './modules/home'
import login from './modules/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // ...sharePage,
    ...home,
    ...login,
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404',
        layout: 'emptyLayout',
        keepAlive: true,
        description: '',
        keywords: '出错了'
      },
      component: () => import('@/pages/404.vue')
    },
    {
      // 匹配不到的路由
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/404.vue')
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      // 保存滚动位置
      return savedPosition
    } else {
      // 切换页面时回到顶部
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  // const systemStore = useSystemStore()
})

export default router
