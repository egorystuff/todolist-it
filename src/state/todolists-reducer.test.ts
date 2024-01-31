import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to by", filter: "all" },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to by", filter: "all" },
  ];

  const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to by", filter: "all" },
  ];

  // const action: ChangeTodolistTitleActionType = {
  //   type: "CHANGE-TODOLIST-TITLE",
  //   id: todoListId2,
  //   title: newTodoListTitle,
  // };

  const action = changeTodolistTitleAC(todoListId2, newTodoListTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test("correct filter of todolist should be changed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to by", filter: "all" },
  ];

  // const action: ChangeTodolistFilterActionType = {
  //   type: "CHANGE-TODOLIST-FILTER",
  //   id: todoListId2,
  //   filter: newFilter,
  // };

  const action = changeTodolistFilterAC(newFilter, todoListId2);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
