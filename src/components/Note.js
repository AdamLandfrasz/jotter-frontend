import React, { useContext } from "react";
import { deleteNote } from "../http";
import { noteContext } from "../context/noteContext";

import DeleteIcon from "@material-ui/icons/Delete";

import noteStyles from "./Notes.module.css";
import buttonStyles from "./Button.module.css";

function Note({ note }) {
  const [notes, setNotes] = useContext(noteContext);

  const handleDelete = () => {
    deleteNote(note);
    setNotes(notes.filter((element) => element._id !== note._id));
  };

  return (
    <div className={noteStyles.note}>
      <div className={noteStyles.title}>{note.title}</div>
      <div className={noteStyles.content}>{note.content}</div>
      <div className={noteStyles.noteBottomRow}>
        <button onClick={handleDelete} className={buttonStyles.iconButton}>
          <DeleteIcon />
        </button>
      </div>
      {note.noteType}
    </div>
  );
}

export default Note;
