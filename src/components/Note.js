import React, { useContext } from "react";
import { deleteNote } from "../http";
import { noteContext } from "../context/noteContext";
import { modalContext } from "../context/modalContext";

import DeleteIcon from "@material-ui/icons/Delete";

import noteStyles from "./Notes.module.css";
import buttonStyles from "./Button.module.css";

function Note({ note }) {
  const [notes, setNotes] = useContext(noteContext);
  const [, setHidden, , setModalNote] = useContext(modalContext);

  const handleDelete = () => {
    deleteNote(note);
    setNotes(notes.filter((element) => element._id !== note._id));
  };

  const showModal = () => {
    setModalNote(note);
    setHidden(false);
  };

  return (
    <div className={noteStyles.note} onClick={showModal}>
      <div className={noteStyles.title}>{note.title}</div>
      <div className={noteStyles.content}>{note.content}</div>
      <div className={noteStyles.noteBottomRow}>
        <button onClick={handleDelete} className={buttonStyles.iconButton}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
