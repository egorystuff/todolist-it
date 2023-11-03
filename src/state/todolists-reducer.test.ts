import { v1 } from "uuid";
import { TodoListType } from "../App";
import { todolistsReducer } from "./todolists-reducer";

test("correct todolist should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: " What to learn", filter: "all" },
    { id: todoListId2, title: " What to by", filter: "all" },
  ];

  const endState = todolistsReducer(startState, { type: "REMOVE-TODOLIST", id: todoListId1 });

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: " What to learn", filter: "all" },
    { id: todoListId2, title: " What to by", filter: "all" },
  ];

  const endState = todolistsReducer(startState, { type: "ADD-TODOLIST", title: newTodoListTitle });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});
