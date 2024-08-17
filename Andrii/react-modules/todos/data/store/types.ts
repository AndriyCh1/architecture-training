import { Todo } from "#modules/todos/data/logic/types";

export type TodosState = {
  todos: Todo[];
  filters: Partial<Todo>;
};
