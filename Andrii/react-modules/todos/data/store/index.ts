import { StateStore } from "#libraries/@core/store/StateStore/types";
import { TodosLogic } from "#modules/todos/data/logic";
import { Todo } from "#modules/todos/data/logic/types";
import { ZustandStore } from "#modules/todos/data/store/providers/ZustandStore";
import { TodosState } from "./types";

export class TodosStore implements StateStore<TodosState> {
  protected logic: TodosLogic;
  private storeProvider: StateStore<TodosState>;

  constructor(settings?: {
    logic?: TodosLogic;
    storeProvider?: StateStore<TodosState>;
  }) {
    this.logic = settings?.logic || new TodosLogic();
    this.storeProvider = settings?.storeProvider || new ZustandStore();
  }

  getState() {
    return this.storeProvider.getState();
  }

  setState(state: Partial<TodosState>) {
    this.storeProvider.setState(state);
  }

  subscribe(handler: (state: TodosState) => void) {
    return this.storeProvider.subscribe(handler);
  }

  createTodo(title: Todo["title"]) {
    this.setState({ todos: this.logic.addTodo(title, this.getState().todos) });
  }

  updateTodoById(id: Todo["id"], todo: Partial<Todo>) {
    this.setState({
      todos: this.logic.editTodo(id, todo, this.getState().todos),
    });
  }

  deleteTodoById(id: Todo["id"]) {
    this.setState({
      todos: this.logic.removeTodo(id, this.getState().todos),
    });
  }
}
