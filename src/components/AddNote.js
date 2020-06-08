import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";
import { newNoteContext } from "../context/newNoteContext";
import { inputExpandedContext } from "../context/inputExpandedContext";

import NoteInput from "./noteInput/NoteInput";
import ListNoteInput from "./noteInput/ListNoteInput";
import { Row, Col } from "react-bootstrap";

import addNoteStyles from "./AddNote.module.css";
import buttonStyles from "./Button.module.css";

const AddNote = () => {
  const [notes, setNotes] = useContext(noteContext);
  const [expanded, setExpanded] = useContext(inputExpandedContext);
  const [newNote, setNewNote, isList, setIsList] = useContext(newNoteContext);
  const [created, setCreated] = useState(false);

  const saveNote = () => {
    if (isList) {
      if (
        !newNote.title &&
        newNote.content.every((row) => !row.content) &&
        newNote._id
      ) {
        setCreated(false);
        return deleteNote(newNote, () =>
          setNewNote({
            content: [{ id: 1, content: "", isComplete: false }],
            noteType: "list",
          })
        );
      }
    }
    if (!(newNote.title + newNote.content) && newNote._id) {
      setCreated(false);
      return deleteNote(newNote, () => setNewNote({}));
    }

    if (!created) {
      setCreated(true);
      return createNote(newNote, (savedNote) => setNewNote(savedNote));
    }
    if (newNote._id) {
      return editNote(newNote, (editedNote) => setNewNote(editedNote));
    }
  };

  const updateNotes = (e) => {
    e.preventDefault();
    setExpanded(false);
    setIsList(false);
    if (newNote._id) {
      setNotes([...notes, newNote]);
      setCreated(false);
      setNewNote({});
      document.querySelector("#note-content").value = "";
    }
  };

  const toggleList = () => {
    setIsList(!isList);
    if (!isList) {
      setNewNote({
        ...newNote,
        content: [{ id: 1, content: "", isComplete: false }],
        noteType: "list",
      });
    } else {
      setNewNote({ ...newNote, content: "", noteType: "note" });
    }
  };

  return (
    <form
      onSubmit={updateNotes}
      onClick={(e) => e.stopPropagation()}
      className={addNoteStyles.form}
      autoComplete="off"
    >
      {expanded ? (
        <Row>
          <Col className={addNoteStyles.col}>
            <input
              className={addNoteStyles.title}
              type="text"
              name="title"
              id="note-title"
              placeholder="Title..."
              spellCheck="true"
              onChange={(e) => {
                newNote[e.target.name] = e.target.value;
                saveNote();
              }}
            />
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col
          className={addNoteStyles.col}
          style={expanded ? {} : { marginBottom: "0" }}
        >
          {isList ? (
            <ListNoteInput saveNote={saveNote} />
          ) : (
            <NoteInput onClick={() => setExpanded(true)} saveNote={saveNote} />
          )}
        </Col>
      </Row>
      {expanded ? (
        <Row>
          <Col className={addNoteStyles.btnCol}>
            <button
              className={buttonStyles.button}
              type="button"
              onClick={() => {
                toggleList();
              }}
            >
              List
            </button>
            <button className={buttonStyles.button} type="submit">
              Done
            </button>
          </Col>
        </Row>
      ) : null}
    </form>
  );
};

export default AddNote;
