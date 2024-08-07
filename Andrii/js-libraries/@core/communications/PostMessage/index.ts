import { PubSub } from '#libraries/@core/communications/PubSub';
import { Message } from './types';

export class PostMessage extends PubSub {
  public publish(message: Message) {
    return super.publish({ messageType: 'message', ...message });
  }
}
