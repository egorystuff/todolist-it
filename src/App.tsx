import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

// Типы данных
export type FilterValuesType = "all" | "completed" | "active";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  // Удаление задач-----------------------------------------------
  function removeTask(id: string, todoListId: string) {
    let task = tasks[todoListId];
    let filterTasks = task.filter((t) => t.id !== id);
    tasks[todoListId] = filterTasks;

    setTasks({ ...tasks });
  }

  // Добавление задач--------------------------------------------
  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasksObj = tasks[todoListId];
    let newTasks = [newTask, ...tasksObj];
    tasks[todoListId] = newTasks;

    setTasks({ ...tasks });
  }

  // Изменение статуса задачи---------------------------------------
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasksObj = tasks[todoListId];
    let task = tasksObj.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  //  Фильтрация задач----------------------------------------------
  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoList([...todoLists]);
    }
  }

  function removeTodoList(todoListId: string) {
    let filterTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoList(filterTodoList);

    delete tasks[todoListId];
    setTasks({ ...tasks });
  }

  //====================================================================================

  let todoListId1 = v1();
  let todoListId2 = v1();

  // Массив тодолистов
  let [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  // Оъект массивов сойств для тодолистов
  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "CSS & HTML", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Pencil", isDone: false },
    ],
  });

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };

    setTodoList([todoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoList.id]: [],
    });
  }

  return (
    <div className='App'>
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        // условия фильтрации задач----------------------------------------------
        let tasksForTodoList = tasks[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
