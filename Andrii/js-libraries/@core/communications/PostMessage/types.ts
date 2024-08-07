import { Message as PubSubMessage } from '#libraries/@core/communications/PubSub/types';
// NOTE: Should I reexport PubSub types?
export * from '#libraries/@core/communications/PubSub/types';
export type Message = Omit<PubSubMessage, 'eventType'>;
