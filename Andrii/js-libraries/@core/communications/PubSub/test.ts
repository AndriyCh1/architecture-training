import { PubSub } from '.';
import { PubSubLike } from './types';

describe('PubSub', () => {
  let pubsub: PubSubLike;

  beforeEach(() => {
    pubsub = new PubSub();
  });

  it('should add new subscriber', async () => {
    const handler = jest.fn();
    pubsub.subscribe('test', handler);
    pubsub.publish({ type: 'test', data: 'data' });
    expect(handler.mock.calls.length).toEqual(1);
  });

  it('should call all subscribers', async () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    pubsub.subscribe('test', handler1);
    pubsub.subscribe('test', handler2);
    pubsub.publish({ type: 'test' });
    expect(handler1.mock.calls.length).toEqual(1);
    expect(handler2.mock.calls.length).toEqual(1);
  });

  it('should unsubscribe via separate method', async () => {
    const handler = jest.fn();
    const { subscriptionId } = pubsub.subscribe('test', handler);
    pubsub.unsubscribe(subscriptionId);
    pubsub.publish({ type: 'test' });
    expect(handler.mock.calls.length).toEqual(0);
  });

  it('should unsubscribe via returned callback on subscription', async () => {
    const handler = jest.fn();
    const { unsubscribe } = pubsub.subscribe('test', handler);
    unsubscribe();
    pubsub.publish({ type: 'test' });
    expect(handler.mock.calls.length).toEqual(0);
  });

  it('should not add the same subscriber', async () => {
    const handler = jest.fn();
    pubsub.subscribe('test', handler);
    pubsub.subscribe('test', handler);
    pubsub.publish({ type: 'test' });
    expect(handler.mock.calls.length).toEqual(1);
  });

  it('should pass message id to a subscriber', async () => {
    const handler = jest.fn();
    pubsub.subscribe('test', handler);
    const { messageId } = pubsub.publish({ type: 'test' });
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ id: messageId }),
    );
  });

  it('should handle not existing topic', async () => {
    const handler = jest.fn();
    pubsub.subscribe('test', handler);
    expect(() => pubsub.publish({ type: 'test' })).not.toThrow();
  });
});
