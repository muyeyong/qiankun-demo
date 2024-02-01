import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import { transformRoutes } from '@/utils/router'
import { useAppStore } from '../store'

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
    meta: {
      layout: 'basic',
      title: 'home',
      requiresAuth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      layout: 'blank',
      title: 'login'
    }
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue'),
    meta: {
      layout: 'blank',
      title: 'not-found'
    }
  }
]

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about.vue'),
    meta: {
      layout: 'basic',
      title: 'home',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: transformRoutes(staticRoutes)
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  const { logged } = storeToRefs(appStore)
  if (logged.value) {
    // 如果跳转到登录页面
    // 存在redirect参数
    // 处理一些逻辑：登录成功需要每次刷新都执行的 登录成功只需要执行一次的
  } else {
    if (to.meta.requiresAuth) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
  next()
})

export default router
