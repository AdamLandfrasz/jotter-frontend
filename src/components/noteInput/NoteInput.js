import React, { useContext } from "react";

import { newNoteContext } from "../../context/newNoteContext";
import { TextareaAutosize } from "@material-ui/core";

import addNoteStyles from "../AddNote.module.css";

function NoteInput({ onClick, saveNote }) {
  const [newNote] = useContext(newNoteContext);

  return (
    <TextareaAutosize
      className={addNoteStyles.content}
      id="note-content"
      name="content"
      spellCheck="true"
      placeholder="Note..."
      onInput={(e) => {
        newNote.content = e.target.value;
        saveNote();
      }}
      onClick={onClick}
    />
  );
}

export default NoteInput;
