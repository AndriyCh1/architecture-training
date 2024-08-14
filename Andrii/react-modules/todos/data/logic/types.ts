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

type RemoveTodoButton = {
  id: Todo["id"];
};

type RestoreTodoButton = {
  id: Todo["id"];
};

type DeleteTodoButton = {
  id: Todo["id"];
};

// Checkboxes:
// - IsDoneTodoCheckbox
// - ApplyFilteringCheckbox // -> ApplySearchFilterCheckbox ?
// - ShowOnlyDoneCheckbox
// - ShowOnlyUndoneCheckbox

// Checkbox interfaces:
type IsDoneTodoCheckbox = {
  id: Todo["id"];
  checked?: boolean;
};

type ApplyFilteringCheckbox = {
  checked?: boolean;
};

type ShowOnlyDoneCheckbox = {
  checked?: boolean;
};

type ShowOnlyUndoneCheckbox = {
  checked?: boolean;
};
