import mitt, { Emitter } from 'mitt'
import { RouteLocationNormalized } from 'vue-router'

type Events = {
  microAppRouteJump: { to: RouteLocationNormalized; from: RouteLocationNormalized }
}

const event: Emitter<Events> = mitt<Events>()

export default event
