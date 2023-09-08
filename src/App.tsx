import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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

  //изменение заголовка задачи
  function changeTodoListTitle(newTitle: string, id: string) {
    const todoList = todoLists.find((tl) => tl.id === id);
    if (todoList) {
      todoList.title = newTitle;
      setTodoList([...todoLists]);
    }
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

  //изменение содержания задачи
  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasksObj = tasks[todoListId];
    let task = tasksObj.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
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
    { id: todoListId1, title: "Task list: What to learn", filter: "all" },
    { id: todoListId2, title: "Task list: What to buy", filter: "all" },
  ]);

  // Оъект массивов свойств для ТОДО листов
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

  // Добавление ТОДО листов
  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: `Task list: ${title}`,
    };

    setTodoList([todoList, ...todoLists]);
    setTasks({
      ...tasks,
      [todoList.id]: [],
    });
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todolist: plans and tasks
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <h2>Add your task list</h2>
        <Grid style={{ marginBottom: "20px" }} container>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={15}>
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
              <Grid item>
                <Paper style={{ padding: "15px" }} elevation={5}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
