import { TodosLogic } from "#modules/todos/data/logic";
import { ZustandStore } from "#modules/todos/data/store-providers/ZustandStore";
import { TodosStore } from ".";

// NOTE: Couldn't decide where to initialize
export const todosStore = new TodosStore({
  logic: new TodosLogic(),
  storeProvider: new ZustandStore(),
});
