import myPage from './myPage'

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    component: () => import('@/pages/home.vue'),
    children: [...myPage]
  }
]

export default routes
