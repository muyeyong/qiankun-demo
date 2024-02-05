import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory, RouteRecordRaw, createMemoryHistory } from 'vue-router'
import event from '../event'

const history = qiankunWindow.__POWERED_BY_QIANKUN__ ? createMemoryHistory() : createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/demo1',
    name: 'Demo1',
    component: () => import('@/pages/demo1.vue'),
    children: [
      {
        path: '/detail',
        name: 'Demo1Detail',
        component: () => import('@/pages/demo1Detail.vue')
      }
    ]
  },
  {
    path: '/demo2',
    name: 'Demo2',
    component: () => import('@/pages/demo2.vue')
  },
  {
    path: '/empty',
    name: 'Empty',
    component: () => import('@/pages/empty.vue')
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue')
  }
]

const router = createRouter({
  history,
  routes
})

router.beforeEach((to, from) => {
  event.emit('microAppRouteJump', { to, from })
  // TODO 如果没有匹配到需要向上反馈
})

export default router
