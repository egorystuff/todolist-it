import React from "react";

import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

//-------------------------------------------------------------------------------------------------------------

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("span");
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return (
    <>
      {editMode ? (
        <TextField
          variant='outlined'
          value={title}
          onChange={onChangeTitleHandler}
          onBlur={activateViewMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )}
    </>
  );
});
