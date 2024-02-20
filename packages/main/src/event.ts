import mitt, { Emitter } from 'mitt'
import { RouteLocationNormalized } from 'vue-router'

type Events = {
  hideMicroApp: { appName: string }
  microAppRouteJump: { to: RouteLocationNormalized; from: RouteLocationNormalized; jumped: boolean }
}

const event: Emitter<Events> = mitt<Events>()

export default event
