import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: "CSS & HTML", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "react", isDone: false },
  ];

  let tasks2: Array<TaskType> = [
    { id: 1, title: "Terminator", isDone: true },
    { id: 2, title: "XXX", isDone: true },
    { id: 3, title: "The lord of the rings", isDone: true },
  ];

  return (
    <div className='App'>
      <Todolist title='What to learn' tasks={tasks1} />
      <Todolist title='Movies' tasks={tasks2} />
    </div>
  );
}

export default App;
