import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }

    case "ADD-TODOLIST": {
      return [...state, { id: action.todolistId, title: action.title, filter: "all" }];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }

      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }

      return [...state];
    }

    default:
      throw new Error("I do not understand this action type");
  }
};

//функции-криэйторы для генератора экшенов, которые используются в тестах
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: todolistTitle, todolistId: v1() };
};

export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: todolistTitle };
};

export const changeTodolistFilterAC = (
  todolistFilter: FilterValuesType,
  todolistId: string,
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: todolistFilter };
};
