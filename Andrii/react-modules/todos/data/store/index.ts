import { TodosLogic } from "#modules/todos/data/logic";
import { Todo } from "#modules/todos/data/logic/types";
import { TodosState } from "./types";
import { StateStore } from "#libraries/@core/store/StateStore/types";

export class TodosStore implements StateStore<TodosState> {
  protected logic: TodosLogic;

  constructor(settings?: { logic?: TodosLogic }) {
    this.logic = settings?.logic || new TodosLogic();
  }

  getState() {
    return {} as TodosState;
  }

  setState(state: Partial<TodosState>) {}

  subscribe() {
    return () => {};
  }

  createTodo(title: Todo["title"]) {
    this.setState({ todos: this.logic.addTodo(title, this.getState().todos) });
  }
}
