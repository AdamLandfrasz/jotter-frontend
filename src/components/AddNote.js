import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";

import { Row, Col } from "react-bootstrap";
import { TextareaAutosize } from "@material-ui/core";

import addNoteStyles from "./AddNote.module.css";
import buttonStyles from "./Button.module.css";

const AddNote = ({ expanded, setExpanded }) => {
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
    setExpanded(false);
    if (Object.keys(note).length !== 0) {
      setNotes([...notes, note]);
      setCreated(false);
      setNote({});
      document.querySelector("#note-title").value = "";
      document.querySelector("#note-content").value = "";
    }
  };

  return (
    <form
      onSubmit={updateNotes}
      onClick={(e) => e.stopPropagation()}
      className={addNoteStyles.form}
      autoComplete="off"
      style={!expanded ? { padding: "0.2rem" } : null}
    >
      <Row style={!expanded ? { display: "none" } : null}>
        <Col className={addNoteStyles.col}>
          <input
            className={addNoteStyles.title}
            type="text"
            name="title"
            id="note-title"
            placeholder="Title..."
            spellCheck="true"
            onChange={(e) => {
              note[e.target.name] = e.target.value;
              saveNote();
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col
          className={addNoteStyles.col}
          style={!expanded ? { marginBottom: "-0.7rem" } : null}
        >
          <TextareaAutosize
            className={addNoteStyles.content}
            name="content"
            id="note-content"
            placeholder="Content..."
            spellCheck="true"
            rows="1"
            onClick={(e) => setExpanded(true)}
            onInput={(e) => {
              note[e.target.name] = e.target.value;
              saveNote();
            }}
          />
        </Col>
      </Row>
      <Row style={!expanded ? { display: "none" } : null}>
        <Col className={addNoteStyles.col}>
          <button className={buttonStyles.button} type="submit">
            Done
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default AddNote;
