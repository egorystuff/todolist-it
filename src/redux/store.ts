import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

//автоматическая типизация через функцию ReturnType
export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
