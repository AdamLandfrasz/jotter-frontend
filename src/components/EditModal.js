import React, { useContext } from "react";
import { modalContext } from "../context/modalContext";
import { noteContext } from "../context/noteContext";

import ListNoteInput from "./noteInput/ListNoteInput";
import NoteInput from "./noteInput/NoteInput";

import modalStyles from "./Modal.module.css";
import { editNote } from "../http";

function EditModal() {
  const [hidden, setHidden, note, setNote] = useContext(modalContext);
  const [notes, setNotes] = useContext(noteContext);

  const saveNote = () => {
    editNote(note, (editedNote) => setNote(editedNote));
  };

  const hideModalAndUpdate = () => {
    setHidden(true);
    // setNotes([...notes.filter((element) => element._id !== note._id), note]);
    setNotes(
      notes.map((element) => (element._id === note._id ? note : element))
    );
  };

  return hidden ? null : (
    <div className={modalStyles.pageMask} onClick={hideModalAndUpdate}>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="title"
          id="edit-note-title"
          placeholder="Title..."
          spellCheck="true"
          defaultValue={note.title}
          onChange={(e) => {
            note.title = e.target.value;
            saveNote();
          }}
        />
        {Array.isArray(note.content) ? (
          <ListNoteInput
            saveNote={saveNote}
            currentNote={note}
            setCurrentNote={setNote}
          />
        ) : (
          <NoteInput saveNote={saveNote} currentNote={note} />
        )}
      </div>
    </div>
  );
}

export default EditModal;
