import React, { useContext } from "react";
import { deleteNote } from "../http";
import { noteContext } from "../context/noteContext";
import { modalContext } from "../context/modalContext";

import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import noteStyles from "./Notes.module.css";
import buttonStyles from "./Button.module.css";

function ListNote({ note }) {
  const [notes, setNotes] = useContext(noteContext);
  const [, setHidden, , setModalNote, , setShareHidden] = useContext(
    modalContext
  );

  const showModal = () => {
    setModalNote(note);
    setHidden(false);
  };

  const showShareModal = (e) => {
    e.stopPropagation();
    setModalNote(note);
    setShareHidden(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNote(note);
    setNotes(notes.filter((element) => element._id !== note._id));
  };

  return (
    <div className={noteStyles.note} onClick={showModal}>
      <div className={noteStyles.title}>{note.title}</div>
      <div className={noteStyles.content}>
        {note.content.map((row) => {
          return (
            <div
              style={{ display: "flex", alignItems: "center" }}
              key={note.content.indexOf(row)}
            >
              <input type="checkbox" checked={row.isComplete} readOnly />
              <div
                style={{
                  textDecoration: row.isComplete ? "line-through" : "none",
                }}
              >
                {row.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className={noteStyles.noteBottomRow}>
        <button onClick={handleDelete} className={buttonStyles.iconButton}>
          <DeleteIcon />
        </button>
        <button onClick={showShareModal} className={buttonStyles.iconButton}>
          <PersonAddIcon />
        </button>
      </div>
    </div>
  );
}

export default ListNote;
