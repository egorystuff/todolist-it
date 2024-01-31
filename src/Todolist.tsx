import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./AppWithReducers";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, ButtonGroup, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (newTitle: string, id: string) => void;
};

export function Todolist(props: PropsType) {
  //functions------------------------------------------------------

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(newTitle, props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  //================================================================

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
        <IconButton onClick={removeTodoList} aria-label='delete' size='large'>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />

      <div>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => props.removeTask(t.id, props.id);

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
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
