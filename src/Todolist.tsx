import React, { useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./redux/store";
import { addTaskAC } from "./state/tasks-reducer";
import { Task } from "./components/Task";

//-------------------------------------------------------------------------------------------------------------------------------------------

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, id: string) => void;
};

//-------------------------------------------------------------------------------------------------------------------------------------------

export const Todolist = React.memo((props: PropsType) => {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id]);

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props]);

  const removeTodoList = () => props.removeTodoList(props.id);
  const changeTodoListTitle = useCallback((newTitle: string) => props.changeTodoListTitle(newTitle, props.id), [props]);

  //-------------------------------------------------------------------------------------------------------------------------------------------
  // фильтрация тасок

  let tasksForTodoList = tasks;

  if (props.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((task) => task.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((task) => task.isDone === false);
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList} aria-label='delete' size='large'>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={useCallback((title) => dispatch(addTaskAC(title, props.id)), [dispatch, props.id])} />

      <div>
        {tasksForTodoList.map((task) => (
          <Task task={task} todolistId={props.id} key={task.id} />
        ))}
      </div>

      <div>
        <ButtonGroup variant='outlined' aria-label='outlined primary button group'>
          <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>
            All
          </Button>
          <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>
            Active
          </Button>
          <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
