import { v1 } from "uuid";
import { TasksStateType } from "../App";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;

      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      return stateCopy;
    }

    default:
      throw new Error("I do not understand this action type");
  }
};

//функции-криэйторы для генератора экшенов, которые используются в тестах
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: "ADD-TASK", title, todolistId };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId };
};
