export type EventHandler = (...args: any[]) => void

export interface IPubSub {
  subscribe: (event: string, handler: EventHandler) => void
  publish: (event: string, ...args: any[]) => void
  unsubscribe: (event: string, handler: EventHandler) => void
}
