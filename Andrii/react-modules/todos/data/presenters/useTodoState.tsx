import { useState } from "react";
import { todosStore } from "#modules/todos/data/store/todosStore";

export const useTodosState = () => {
  const [state, setState] = useState(todosStore.getState());
  todosStore.subscribe(setState);
  return state;
};
