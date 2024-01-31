import { RouteRecordRaw } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'

/** 加上布局 */
function routeWithLayout(route: RouteRecordRaw, isDynamic = false) {
  const layout = route.meta?.layout ?? 'basic'
  return {
    path: `${route.path}-parent`,
    meta: {
      isDynamic
    },
    component: layout === 'basic' ? BasicLayout : BlankLayout,
    children: [route],
    redirect: route.path
  }
}

/** 转换路由 */
export function transformRoutes(routes: RouteRecordRaw[], isDynamic = false) {
  return routes.map((route) => {
    return routeWithLayout(route, isDynamic)
  })
}
