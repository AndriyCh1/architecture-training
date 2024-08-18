import { useTodosActions, useTodosState } from "#modules/todos/data/presenters";

export const EditTodoButton = () => {
  const { createTodo } = useTodosActions();
  const { todos } = useTodosState();

  console.log("Todos from EditTodoButton", todos);

  return (
    <button
      onClick={() => {
        createTodo("EditTodoButton Todo");
      }}
    >
      EditTodoButton
    </button>
  );
};
