/* Business logic:
  - Dependent only on programming language
  - About data transformation/processing
*/

/* 2 stores: CurrentTodos,  HistoryTodos */

import { generateId } from "#libraries/crypto/generateId";
import { Todo } from "./types";

export class TodosLogic {
  createTodo(title: Todo["title"]): Todo {
    return {
      id: generateId(),
      title,
      isDone: false, // According to business requirements
      createdAt: new Date() // According to business requirements
    };
  }

  addTodo(title: Todo["title"], todos: Todo[]): Todo[] {
    if (todos.find((todo) => todo.title === title)){
      return todos
    }

    return [...todos, this.createTodo(title)]
  }
}
