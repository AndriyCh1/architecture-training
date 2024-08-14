export interface Message {
  type: string;
  id?: string;
  data?: any;
}

export type MessageHandler = (message: Message) => void;

export interface Subscription {
  id: string;
  messageType: Message['type'];
  messageHandler: MessageHandler;
}

export interface SubscribeResponse {
  subscriptionId: Subscription['id'];
  messageType: Subscription['messageType'];
  unsubscribe: () => void;
}

export interface PublishResponse {
  messageId: Message['id'];
}

export interface PubSubLike {
  subscribe: (
    messageType: Message['type'],
    messageHandler: MessageHandler,
  ) => SubscribeResponse;
  publish: (message: Message) => PublishResponse;
  unsubscribe: (id: string) => boolean;
}
