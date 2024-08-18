import { useState } from "react";
import { getTodoStore } from "#modules/todos/data/store/instance";

export const useTodosState = () => {
  const [state, setState] = useState(getTodoStore().getState());
  getTodoStore().subscribe(setState);
  return state;
};
