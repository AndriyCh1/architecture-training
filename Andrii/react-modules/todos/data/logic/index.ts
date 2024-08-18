/* Business logic:
  - Dependent only on programming language
  - About data transformation/processing
*/

/* 2 stores: CurrentTodos,  HistoryTodos */

import { generateId } from "#libraries/@core/crypto/generateId";
import { Todo } from "./types";

export class TodosLogic {
  createTodo(title: Todo["title"]): Todo {
    return {
      id: generateId(),
      title,
      isDone: false, // Accordingly to the business requirements
      createdAt: new Date(), // Accordingly to the business requirements
    };
  }

  addTodo(title: Todo["title"], todos: Todo[]): Todo[] {
    if (todos.find((todo) => todo.title === title)) {
      return todos;
    }

    return [...todos, this.createTodo(title)];
  }

  updateTodoById(id: Todo["id"], todo: Partial<Todo>, todos: Todo[]): Todo[] {
    return todos.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, ...todo } : todoItem,
    );
  }

  deleteTodoById(id: Todo["id"], todos: Todo[]): Todo[] {
    return todos.filter((todo) => todo.id !== id);
  }
}
