import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS & HTML", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "react", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  // Удаление задач-----------------------------------------------
  function removeTask(id: string) {
    let filterTasks = tasks.filter((t) => t.id !== id);

    setTasks(filterTasks);
  }

  // Добавление задач--------------------------------------------
  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];

    setTasks(newTasks);
  }

  // Изменение статуса задачи---------------------------------------
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  // фильтрация задач----------------------------------------------
  let tasksForTodoList = tasks;

  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  //====================================================================================

  return (
    <div className='App'>
      <Todolist
        title='What to learn'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
