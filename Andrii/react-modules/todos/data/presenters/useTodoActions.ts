import { todosStore } from "#modules/todos/data/store/instance";

export const useTodosActions = () => {
  return {
    createTodo: todosStore.createTodo.bind(todosStore),
    updateTodoById: todosStore.updateTodoById.bind(todosStore),
    deleteTodoById: todosStore.deleteTodoById.bind(todosStore)
  };
};
