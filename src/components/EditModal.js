import React, { useContext, useEffect } from "react";
import { editNote } from "../http";
import { modalContext } from "../context/modalContext";
import { noteContext } from "../context/noteContext";

import ListNoteInput from "./noteInput/ListNoteInput";
import NoteInput from "./noteInput/NoteInput";

import modalStyles from "./Modal.module.css";
import addNoteStyles from "./AddNote.module.css";

function EditModal() {
  const [hidden, setHidden, note, setNote] = useContext(modalContext);
  const [notes, setNotes] = useContext(noteContext);

  useEffect(() => {
    if (hidden) {
      document.querySelector("body").style = "";
    } else {
      document.querySelector("body").style.overflow = "hidden";
    }
  }, [hidden]);

  const saveNote = () => {
    editNote(note, (editedNote) => setNote(editedNote));
  };

  const hideModalAndUpdate = () => {
    setHidden(true);
    saveNote();
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
          autoComplete="off"
          defaultValue={note.title}
          className={addNoteStyles.title}
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
          <NoteInput
            id="edit-note-content"
            saveNote={saveNote}
            currentNote={note}
          />
        )}
      </div>
    </div>
  );
}

export default EditModal;
