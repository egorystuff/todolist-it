import { v1 } from "uuid";
import { TodoListType } from "../App";

type ActionType = {
  type: string;
  [key: string]: any;
};

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }

    case "ADD-TODOLIST": {
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    }

    default:
      throw new Error("I do not understand this action type");
  }
};
