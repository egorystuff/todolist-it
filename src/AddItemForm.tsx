import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItem();
      setNewTaskTitle("");
    }
  };

  const addItem = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is required!");
      setNewTaskTitle("");
      return;
    }
  };

  return (
    <div>
      <TextField
        style={{ marginBottom: "30px" }}
        variant='outlined'
        label='Type value'
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />

      <IconButton onClick={addItem} aria-label='add'>
        <LibraryAddIcon />
      </IconButton>
    </div>
  );
}
