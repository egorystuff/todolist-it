import React, { useCallback } from "react";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./redux/store";

//-------------------------------------------------------------------------------------------------------------

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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolists);

  const changeTodoListTitle = useCallback(
    (newTitle: string, id: string) => dispatch(changeTodolistTitleAC(newTitle, id)),
    [dispatch],
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todoListId: string) => dispatch(changeTodolistFilterAC(value, todoListId)),
    [dispatch],
  );

  const removeTodoList = useCallback((todoListId: string) => dispatch(removeTodolistAC(todoListId)), [dispatch]);

  const addTodoList = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch]);

  //-------------------------------------------------------------------------------------------------------------------------------------------

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
              return (
                <Grid item>
                  <Paper style={{ padding: "15px" }} elevation={5}>
                    <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      changeFilter={changeFilter}
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

export default App;
