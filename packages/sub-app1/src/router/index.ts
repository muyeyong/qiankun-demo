import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory, RouteRecordRaw, createMemoryHistory } from 'vue-router'
import event from '@/event'
import { useGlobalStore } from '@/store'
import { APP_NAME } from '~/vite/constant'

const history = qiankunWindow.__POWERED_BY_QIANKUN__ ? createMemoryHistory() : createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('@/pages/demo1.vue')
  },
  {
    path: '/demo1/detail',
    name: 'demo1Detail',
    component: () => import('@/pages/demo1Detail.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('@/pages/demo2.vue')
  },
  {
    path: '/empty',
    name: 'empty',
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

router.beforeEach((to, from, next) => {
  const globalStore = useGlobalStore()
  const { currentApp } = storeToRefs(globalStore)
  if (currentApp.value === APP_NAME) {
    /** 如果返回的是空页面，并且存在历史记录。那么直接跳转到历史记录上去 */
    event.emit('microAppRouteJump', { to, from, jumped: !(to.name === 'notFound') })
  }
  if (to.name === 'noFound') next(false)
  else next()
})

export default router
