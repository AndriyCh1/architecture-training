import { useTodosActions, useTodosState } from "#modules/todos/data/presenters";

// NOTE: Temporary
export const CreateTodoButton = () => {
  const { createTodo } = useTodosActions();
  const { todos } = useTodosState();

  console.log("Todos from CreateTodoButton", todos);

  return (
    <button
      onClick={() => {
        createTodo("CreateTodoButton Todo");
      }}
    >
      CreateTodoButton
    </button>
  );
};
