export interface Message {
  messageType: string;
  [key: string]: any;
}

export interface MessageEvent {
  id: string;
  messageType: string;
  [key: string]: any;
}

export type MessageHandler = (message: MessageEvent) => void;

export interface Subscription {
  id: string;
  messageType: string;
  messageHandler: MessageHandler;
}

export interface SubscribeResponse {
  subscriptionId: Subscription['id'];
  messageType: Subscription['messageType'];
  unsubscribe: () => void;
}

export interface PublishResponse {
  messageId: MessageEvent['id'];
}

export interface PubSubLike {
  subscribe: (
    messageType: string,
    messageHandler: MessageHandler,
  ) => SubscribeResponse;
  publish: (message: Message) => PublishResponse;
  unsubscribe: (id: string) => boolean;
}
