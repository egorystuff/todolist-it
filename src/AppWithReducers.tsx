import React, { useReducer } from "react";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

// Типы данных-------------------------------------------------------------------------------------------------------------
export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
//-------------------------------------------------------------------------------------------------------------------------------------------

const AppWithRedusers: React.FC = () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  // Массив тодолистов-------------------------------------------------------------------------------------------------------------
  let [todoLists, dispatchToTodoListsReduser] = useReducer(todolistsReducer, [
    { id: todoListId1, title: "Task list: What to learn", filter: "all" },
    { id: todoListId2, title: "Task list: What to buy", filter: "all" },
  ]);

  // Оъект массивов свойств для ТОДО листов------------------------------------------------------------------------------------------------
  let [tasks, dispatchToTasksReduser] = useReducer(tasksReducer, {
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

  //for tasks====================================================================================

  // Удаление задач-----------------------------------------------
  function removeTask(id: string, todoListId: string) {
    dispatchToTasksReduser(removeTaskAC(id, todoListId));
  }

  // Добавление задач--------------------------------------------
  function addTask(title: string, todoListId: string) {
    dispatchToTasksReduser(addTaskAC(title, todoListId));
  }

  // Изменение статуса задачи---------------------------------------
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    dispatchToTasksReduser(changeTaskStatusAC(taskId, isDone, todoListId));
  }

  //изменение содержания задачи
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    dispatchToTasksReduser(changeTaskTitleAC(taskId, newTitle, todoListId));
  }

  //for todolists====================================================================================

  //изменение заголовка задачи
  function changeTodoListTitle(newTitle: string, id: string) {
    dispatchToTodoListsReduser(changeTodolistTitleAC(newTitle, id));
  }

  //  Фильтрация задач----------------------------------------------
  function changeFilter(value: FilterValuesType, todoListId: string) {
    dispatchToTodoListsReduser(changeTodolistFilterAC(value, todoListId));
  }

  function removeTodoList(todoListId: string) {
    const action = removeTodolistAC(todoListId);
    dispatchToTasksReduser(action);
    dispatchToTodoListsReduser(action);
  }

  // Добавление ТОДО листов
  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksReduser(action);
    dispatchToTodoListsReduser(action);
  }

  return (
    <>
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
                      changeTaskTitle={changeTaskTitle}
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
    </>
  );
};

export default AppWithRedusers;
