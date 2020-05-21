import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";

const AddNote = () => {
  const [notes, setNotes] = useContext(noteContext);
  const [note, setNote] = useState({});
  const [created, setCreated] = useState(false);

  const saveNote = () => {
    if (!note.title && !note.content) {
      setCreated(false);
      return deleteNote(note, () => setNote({}));
    }
    if (!created) {
      setCreated(true);
      return createNote(note, (savedNote) => setNote(savedNote));
    }
    if (note._id) {
      return editNote(note, (editedNote) => setNote(editedNote));
    }
  };

  const updateNotes = (e) => {
    e.preventDefault();
    if (Object.keys(note).length !== 0) {
      setNotes([...notes, note]);
      setCreated(false);
      setNote({});
      document.querySelector("#note-title").value = "";
      document.querySelector("#note-content").value = "";
    }
  };

  return (
    <div id="add-note">
      <form onSubmit={updateNotes}>
        <input
          type="text"
          name="title"
          id="note-title"
          autoComplete="off"
          placeholder="Title..."
          onChange={(e) => {
            note[e.target.name] = e.target.value;
            saveNote();
          }}
        />
        <textarea
          type="text"
          name="content"
          id="note-content"
          autoComplete="off"
          placeholder="Note..."
          onChange={(e) => {
            note[e.target.name] = e.target.value;
            saveNote();
          }}
        />
        <button type="submit">DONE</button>
      </form>
    </div>
  );
};

export default AddNote;
