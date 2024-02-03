import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../state/tasks-reducer";
import { TaskType } from "../Todolist";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

//-------------------------------------------------------------------------------------------------------------------------------------------

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();

  const onRemoveHandler = useCallback(
    () => dispatch(removeTaskAC(props.task.id, props.todolistId)),
    [dispatch, props.task.id, props.todolistId],
  );

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
    },
    [dispatch, props.task.id, props.todolistId],
  );

  const onChangeTitleHandler = useCallback(
    (newValue: string) => dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId)),
    [dispatch, props.task.id, props.todolistId],
  );

  //-------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone} />

      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />

      <IconButton onClick={onRemoveHandler} aria-label='delete' size='large'>
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
