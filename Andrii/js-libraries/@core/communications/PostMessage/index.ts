import { PubSub } from '#libraries/@core/communications/PubSub';
import { generateId } from '#libraries/@core/crypto/generateId';
import { Message, MessageHandler } from './types';

export class PostMessage extends PubSub {
  constructor() {
    super();

    window.addEventListener('message', (event) => {
      const message = event.data;
      super.publish(message);
    });
  }

  public subscribe(messageType: string, messageHandler: MessageHandler) {
    return super.subscribe(messageType, messageHandler);
  }

  public publish(message: Message) {
    const messageId = message.id ?? generateId();
    window.postMessage(message);
    return { messageId };
  }
}
