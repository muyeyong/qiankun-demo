import { mockMenu } from '~/mock'
import { MenuItem } from '@/types'
// 实际请求需要返回状态码 信息 以及数据等
/** 获取菜单 */
export const getMenuDataReq = (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMenu)
    }, 2000)
  })
}
