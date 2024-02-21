import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory, RouteRecordRaw, createMemoryHistory } from 'vue-router'
import event from '@/event'
import { useGlobalStore } from '@/store'
import { APP_NAME } from '~/vite/constant'
import { useAppStore } from '../store/app'

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
    meta: {
      keepAlive: false
    },
    component: () => import('@/pages/demo2.vue')
  },
  {
    path: '/demo2/detail',
    name: 'demo2Detail',
    component: () => import('@/pages/demo2Detail.vue')
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
  const { currentApp, globalHistoryRecord } = globalStore
  const appStore = useAppStore()
  const toInThisApp = to.name !== 'notFound'
  if (currentApp === APP_NAME && to.fullPath !== from.fullPath && !appStore.noReportRoute) {
    if (to.name === 'empty' && globalHistoryRecord.length > 0) {
      const nextPath = globalHistoryRecord[globalHistoryRecord.length - 1].path
      return next(
        nextPath.startsWith(`/${APP_NAME}`) ? nextPath.replace(`/${APP_NAME}`, '') : nextPath
      )
    }
    /** 如果返回的是空页面，并且存在历史记录。那么直接跳转到历史记录上去 */
    event.emit('microAppRouteJump', {
      to: {
        ...to,
        path: toInThisApp ? `/${APP_NAME}${to.path}` : to.path,
        fullPath: toInThisApp ? `/${APP_NAME}${to.fullPath}` : to.fullPath
      },
      from: {
        ...from,
        path: `/${APP_NAME}${from.path}`,
        fullPath: `/${APP_NAME}${from.fullPath}`
      },
      jumped: toInThisApp
    })
  }
  if (!toInThisApp) next(false)
  else next()
})

export default router
