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

    const subscription: Subscription = {
      id: generateId(),
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

  public publish(message: Message) {
    const subscribers = this.subscribers.get(message.type);

    const messageId = message.id ?? generateId();

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

    subscribers!.delete(subscription.messageHandler);

    if (subscribers!.size === 0) {
      this.subscribers.delete(subscription.messageType);
    }

    return true;
  }
}
