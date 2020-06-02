import React, { useContext } from "react";
import { deleteNote } from "../http";
import { noteContext } from "../context/noteContext";

import DeleteIcon from "@material-ui/icons/Delete";

import noteStyles from "./Notes.module.css";
import buttonStyles from "./Button.module.css";

function Note(props) {
  const [notes, setNotes] = useContext(noteContext);

  const handleDelete = () => {
    deleteNote(props.note);
    setNotes(notes.filter((note) => note._id !== props.note._id));
  };

  return (
    <div className={noteStyles.note}>
      <div className={noteStyles.title}>{props.note.title}</div>
      <div className={noteStyles.content}>{props.note.content}</div>
      <div>
        <button onClick={handleDelete} className={buttonStyles.deleteButton}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
