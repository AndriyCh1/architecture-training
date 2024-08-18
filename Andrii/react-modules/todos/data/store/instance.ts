import { StateStore } from "#libraries/@core/store/StateStore/types";
import { TodosLogic } from "#modules/todos/data/logic";
import { ZustandStore } from "#modules/todos/data/store/providers/ZustandStore";
import { TodosStore } from ".";

let todosStore = new TodosStore({
  logic: new TodosLogic(),
  storeProvider: new ZustandStore(),
});

export const getTodoStore = () => {
  return todosStore
}

export const setTodoStore = (store: TodosStore) => {
  todosStore = store
}
