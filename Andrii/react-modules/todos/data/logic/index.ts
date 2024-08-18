/* Business logic:
  - Dependent only on programming language
  - About data transformation/processing
*/

/* 2 stores: CurrentTodos,  HistoryTodos */

import { TodosLogicToolset } from "./toolset";
import { Todo } from "./types";

export class TodosLogic extends TodosLogicToolset {
  addTodo(title: Todo["title"], todos: Todo[]): Todo[] {
    // TODO: check if title is not empty
    if (todos.find((todo) => todo.title === title)) {
      return todos;
    }

    return [...todos, this.createTodo(title)];
  }

  editTodo(todos: Todo[], id: Todo["id"], incomingData: Partial<Todo>): Todo[] {
    return todos.map((todo) =>
      todo.id === id ? {
        ...todo,
        ...incomingData,
        id: todo.id,
        createdAt: todo.createdAt,
      } : todo,
    );
  }

  removeTodo(id: Todo["id"], todos: Todo[]): Todo[] {
    return [...todos.filter((todo) => todo.id !== id)];
  }
}
