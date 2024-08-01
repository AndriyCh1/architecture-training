import { getUniqueID } from '#libraries/@core/crypto/getUniqueID';
import {
  Publish,
  PubSubLike,
  Subscribe,
  Unsubscribe,
  SubscribeCallback,
  SubscriptionID,
} from '#libraries/@interfaces';
import {
  SubscriptionInfo,
} from './types';

export class PubSub implements PubSubLike {
  private readonly subscriptions = new Map<string, Set<Function>>();

  private readonly subscriptionIDs = new Map<string, SubscriptionInfo>();

  private getSubscriptionsByType(messageType: Parameters<Subscribe>[0]) {
    return this.subscriptions.get(messageType as string) || new Set();
  }

  private getSubscriptionInfoByID(subscriptionID: SubscriptionID) {
    return (this.subscriptionIDs.get(subscriptionID) || {}) as SubscriptionInfo;
  }

  subscribe(
    messageType: Parameters<Subscribe>[0],
    callback: SubscribeCallback,
  ): ReturnType<Subscribe> {
    const id = getUniqueID();

    this.subscriptions.set(
      messageType as string,
      this.getSubscriptionsByType(messageType)
        .add(callback),
    );

    this.subscriptionIDs.set(id, {
      type: messageType as string,
      callback,
    });

    return {
      subscriptionID: id,
      unsubscribe: () => this.unsubscribe(id),
    };
  }

  publish(
    message: Parameters<Publish>[0],
  ) {
    const subscriptions = this.getSubscriptionsByType(message.type);

    if (subscriptions.size < 1) {
      return '';
    }

    message.id = message.id || getUniqueID();

    subscriptions
      .forEach((callback) => {
        (callback as Parameters<Subscribe>[1])(message);
      });

    return message.id;
  }

  unsubscribe(subscriptionID: Parameters<Unsubscribe>[0]) {
    const { callback, type } = this.getSubscriptionInfoByID(subscriptionID);

    if (!callback || !type) {
      return false;
    }

    this.subscriptionIDs.delete(subscriptionID);
    this.getSubscriptionsByType(type).delete(callback);

    return true;
  }
}
