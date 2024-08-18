import { create, StoreApi, UseBoundStore } from "zustand";
import { StateStore } from "#libraries/@core/store/StateStore/types";
import { TodosState } from "#modules/todos/data/store/types";

export class ZustandStore implements StateStore<TodosState> {
  protected store: UseBoundStore<StoreApi<TodosState>>;

  constructor() {
    this.store = create<TodosState>(() => ({
      filters: {},
      todos: [],
    }));
  }

  getState() {
    return this.store.getState();
  }

  setState(state: Partial<TodosState>) {
    this.store.setState(state);
  }

  subscribe(handler: (state: TodosState) => void) {
    return this.store.subscribe(handler);
  }
}
