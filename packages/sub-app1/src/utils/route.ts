import { RouteRecordRaw } from 'vue-router'
function isRouteExistInChildRoutes(children: RouteRecordRaw[], path: string, parentPath = '') {
  for (let i = 0; i < children.length; i++) {
    const currPath = children[i].path.startsWith('/')
      ? `${parentPath}${children[i].path}`
      : `${parentPath}/${children[i].path}`
    if (currPath === path) {
      return true
    } else if (children[i].children) {
      const exists = isRouteExistInChildRoutes(children[i].children!, path, currPath)
      if (exists) {
        return true
      }
    }
  }
  return false
}

export function isRouteExist(path: string, routes: RouteRecordRaw[]): boolean {
  for (const route of routes) {
    if (route.path === path) {
      return true
    }
    if (route.children && isRouteExistInChildRoutes(route.children, path, route.path)) {
      return true
    }
  }
  return false
}
