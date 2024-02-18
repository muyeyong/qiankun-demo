import { QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { Emitter, EventType } from 'mitt'
import { StoreDefinition } from 'pinia'

export interface QiankunMountProps extends QiankunProps {
  globalEvent?: Emitter<Record<EventType, unknown>>
  globalStore?: StoreDefinition
  path?: string
  newPoint?: boolean
}

/** 全局历史记录 */

export interface GlobalHistoryRecord {
  path: string
}
