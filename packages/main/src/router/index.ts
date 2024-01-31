import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import { transformRoutes } from '@/utils/router'

export const staticRoutes: Array<RouteRecordRaw> = [
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

export default router
