import React, { ChangeEvent, useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, ButtonGroup, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./redux/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

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

export function Todolist(props: PropsType) {
  console.log("todolist");
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id]);

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  //-------------------------------------------------------------------------------------------------------------------------------------------
  // фильтрация тасок

  let tasksForTodoList = tasks;

  if (props.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
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
      <AddItemForm addItem={useCallback((title) => dispatch(addTaskAC(title, props.id)), [])} />

      <div>
        {tasksForTodoList.map((t) => {
          const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id));

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
          };

          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} />

              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler} aria-label='delete' size='large'>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
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
}
