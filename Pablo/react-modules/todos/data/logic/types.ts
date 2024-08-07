import { DocumentID } from '#libraries/@interfaces';

export type Todo = {
  id: DocumentID;
  title: string;
  isDone: boolean;
  createdAt: Date;
};
