import { generateId } from '#libraries/@core/crypto/generateId';
import {
  MessageHandler,
  PubSubLike,
  SubscribeResponse,
  Subscription,
  Message,
} from './types';

export class PubSub implements PubSubLike {
  private subscribers = new Map<string, Set<MessageHandler>>();

  private subscriptions = new Map<string, Subscription>();

  public subscribe(
    messageType: string,
    messageHandler: MessageHandler,
  ): SubscribeResponse {
    if (!this.subscribers.has(messageType)) {
      this.subscribers.set(messageType, new Set());
    }

    this.subscribers.get(messageType)?.add(messageHandler);

    const subscriptionId = generateId();

    const subscription: Subscription = {
      id: subscriptionId,
      messageType,
      messageHandler,
    };

    this.subscriptions.set(subscription.id, subscription);

    return {
      subscriptionId: subscription.id,
      messageType,
      unsubscribe: () => this.unsubscribe(subscription.id),
    };
  }

  // NOTE: How to deal with primitive-type arguments?
  // Should I check whether it is an object?
  public publish(message: Message) {
    const subscribers = this.subscribers.get(message.messageType);

    const messageId = generateId();

    subscribers?.forEach((subscriber) => {
      subscriber({ id: messageId, ...message });
    });

    return { messageId };
  }

  public unsubscribe(subscriptionId: string) {
    const subscription = this.subscriptions.get(subscriptionId);

    if (!subscription) {
      return false;
    }

    const subscribers = this.subscribers.get(subscription.messageType);

    if (!subscribers) {
      return false;
    }

    subscribers.delete(subscription.messageHandler);

    if (subscribers.size === 0) {
      this.subscribers.delete(subscription.messageType);
    }

    return true;
  }
}
