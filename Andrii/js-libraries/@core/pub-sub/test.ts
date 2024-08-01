import { PubSub } from './pub-sub'

describe('PubSub', () => {
  it('should add new subscriber', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    pubsub.publish('test')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should call all subscribers', async () => {
    const pubsub = new PubSub()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    pubsub.subscribe('test', handler1)
    pubsub.subscribe('test', handler2)
    pubsub.publish('test')
    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).toHaveBeenCalledTimes(1)
  })

  it('should remove subscriber', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    pubsub.unsubscribe('test', handler)
    pubsub.publish('test')
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('should not add same subscriber', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    pubsub.subscribe('test', handler)
    pubsub.publish('test')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should publish to all subscribers', async () => {
    const pubsub = new PubSub()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    pubsub.subscribe('test', handler1)
    pubsub.subscribe('test', handler2)
    pubsub.publish('test')
    expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).toHaveBeenCalledTimes(1)
  })

  it('should remove topic if no subscribers left', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    pubsub.unsubscribe('test', handler)
    pubsub.publish('test')
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('should call handler with args', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    pubsub.publish('test', 'arg1', 2, { param: true })
    expect(handler).toHaveBeenCalledWith('arg1', 2, { param: true })
  })

  it('should handle not existing topic', async () => {
    const pubsub = new PubSub()
    const handler = jest.fn()
    pubsub.subscribe('test', handler)
    expect(() => pubsub.publish('test2')).not.toThrow()
  })
})
