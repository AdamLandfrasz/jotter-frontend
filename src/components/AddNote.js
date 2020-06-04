import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";

import { Row, Col } from "react-bootstrap";
import { TextareaAutosize } from "@material-ui/core";

import addNoteStyles from "./AddNote.module.css";
import buttonStyles from "./Button.module.css";

const AddNote = ({ expanded, setExpanded }) => {
  const [notes, setNotes] = useContext(noteContext);
  const [note, setNote] = useState({ content: "", title: "" });
  const [created, setCreated] = useState(false);

  const saveNote = () => {
    note.content = note.content.replace(/<br>/g, "\n").trim();
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
      setNote({ content: "", title: "" });
      document.querySelector("#note-title").value = "";
      document.querySelector("#note-content").textContent = "";
    }
  };

  return (
    <form
      onSubmit={updateNotes}
      onClick={(e) => e.stopPropagation()}
      className={addNoteStyles.form}
      autoComplete="off"
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
          <div
            className={addNoteStyles.content}
            data-name="content"
            id="note-content"
            spellCheck="true"
            contentEditable="true"
            onClick={(e) => setExpanded(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.execCommand("insertHTML", false, "<br><br>");
                console.log(e.target.innerHTML);
              }
            }}
            onInput={(e) => {
              note[e.target.dataset.name] = e.target.innerHTML;
              saveNote();
            }}
          />
        </Col>
      </Row>
      <Row style={!expanded ? { display: "none" } : null}>
        <Col className={addNoteStyles.col}>
          <button className={buttonStyles.button} type="button">
            List
          </button>
          <button className={buttonStyles.button} type="submit">
            Done
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default AddNote;
