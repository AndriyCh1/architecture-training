import { generateId } from "#libraries/@core/crypto/generateId";
import { Todo } from "./types";

export class TodosLogicToolset {
  createTodo(title: Todo["title"]): Todo {
    return {
      id: generateId(),
      title,
      isDone: false, // Accordingly to the business requirements
      createdAt: new Date(), // Accordingly to the business requirements
    };
  }

  normalizeTodoTitle(title: Todo["title"]): Todo["title"]{
    return title
  }
}
