/**
 * 全局事件总线API
 */


import mitt, { Handler, EventType } from 'mitt'

const emitter = mitt()

const EventBus = {
  // listen to an event
  $on: (customEventName: string, callback: Handler) => {
    emitter.on(customEventName, callback) 
  },
  // listen to all events
  $all: (callback: Handler) => {
    emitter.on('*', callback) 
  },
  // fire an event
  $emit: (customEventName: string, fireData: unknown) => {
    emitter.emit(customEventName, fireData) 
  },
  // clearing all events
  $clear: () => {
    emitter.all.clear() 
  },
  // unlisten
  $off: (customEventName: string, callback: Handler) => {
    emitter.off(customEventName, callback) 
  },
}

export default EventBus