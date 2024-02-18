import mitt, { Emitter } from 'mitt'
import { MicroAppRouteParams } from '@/types'

type Events = {
  microAppRouteJump: { to: MicroAppRouteParams; from: MicroAppRouteParams }
  hideMicroApp: string
}

const event: Emitter<Events> = mitt<Events>()

export default event
