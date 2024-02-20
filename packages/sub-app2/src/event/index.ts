import mitt, { Emitter, EventType } from 'mitt'

class Event {
  private event
  constructor() {
    this.event = mitt()
  }
  override(event: Emitter<Record<EventType, unknown>>) {
    this.event = event
  }
  on(eventName: string, handler: any) {
    this.event.on(eventName, handler)
  }
  emit(eventName: string, data: any) {
    this.event.emit(eventName, data)
  }
  off(eventName: string, handler: any) {
    this.event.off(eventName, handler)
  }
}

const event = new Event()

export default event
