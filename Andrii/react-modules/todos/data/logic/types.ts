import { DocumentID } from "#libraries/@interfaces";

export type Todo = {
  id: DocumentID;
  title: string;
  isDone: boolean;
  createdAt: Date;
};

// General Components:
// - input
// - textarea
// - button
// - checkbox
// - li

// Buttons:
// - CreateTodoButton
// - EditTodoButton
// - RemoveTodoButton
// - RestoreTodoButton
// - DeleteTodoButton

// Button interfaces:
type CreateTodoButtonProps = {
  title: Todo["title"];
};

type EditTodoButton = {
  id: Todo["id"];
  data: Partial<Todo>; // Consider Omitting
};

// Checkboxes:
// - IsDoneTodoCheckbox
// - ApplyFilteringCheckbox
// - ShowOnlyDoneCheckbox
// - ShowOnlyUndoneCheckbox

// Checkbox interfaces:
