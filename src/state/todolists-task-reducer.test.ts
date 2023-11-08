import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTaskState: TasksStateType = {};
  const startTodolistState: Array<TodoListType> = [];

  const action = addTodolistAC("title no matter");

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistsReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTask).toBe(action.todolistId);
  expect(idFromTodolist).toBe(action.todolistId);
});
