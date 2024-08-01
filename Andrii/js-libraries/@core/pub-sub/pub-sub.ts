import { EventHandler, IPubSub } from './types'

export class PubSub implements IPubSub {
  private subscriptions: Map<string, Set<EventHandler>> = new Map()

  public subscribe(event: string, handler: EventHandler) {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set<EventHandler>())
    }

    this.subscriptions.get(event)?.add(handler)
  }

  public publish(event: string, ...args: any[]) {
    const subscribers = this.subscriptions.get(event)
    subscribers?.forEach(handler => handler(...args))
  }

  public unsubscribe(event: string, handler: EventHandler) {
    const subscribers = this.subscriptions.get(event)

    if (!subscribers) return

    subscribers.delete(handler)

    if (subscribers.size === 0) {
      this.subscriptions.delete(event)
    }
  }
}
