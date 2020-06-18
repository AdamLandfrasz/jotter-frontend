import React from "react";

import { TextareaAutosize } from "@material-ui/core";

import addNoteStyles from "../AddNote.module.css";

function NoteInput({ id, onClick, saveNote, currentNote }) {
  return (
    <TextareaAutosize
      className={addNoteStyles.content}
      id={id}
      name="content"
      autoComplete="off"
      spellCheck="true"
      placeholder="Note..."
      defaultValue={currentNote.content}
      onInput={(e) => {
        currentNote.content = e.target.value;
        saveNote();
      }}
      onClick={onClick}
    />
  );
}

export default NoteInput;
