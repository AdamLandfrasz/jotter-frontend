import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";
import { inputExpandedContext } from "../context/inputExpandedContext";

import { Row, Col } from "react-bootstrap";

import addNoteStyles from "./AddNote.module.css";
import buttonStyles from "./Button.module.css";

const AddNote = () => {
  const [notes, setNotes] = useContext(noteContext);
  const [expanded, setExpanded] = useContext(inputExpandedContext);
  const [note, setNote] = useState({
    noteType: "note",
  });
  const [created, setCreated] = useState(false);
  const [isList, setIsList] = useState(false);

  const saveNote = () => {
    if (!note.title && !note.content && note._id) {
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
    if (Object.keys(note).length > 1) {
      setNotes([...notes, note]);
      setCreated(false);
      setNote({ content: "", title: "", noteType: "note" });
      document.querySelector("#note-title").value = "";
      document.querySelector("#note-content").textContent = "";
    }
  };

  const toggleList = () => {
    setIsList(!isList);
    if (!isList) {
      note.type = "list";
      note.content = note.content.split("\n").map((row) => {
        return { content: row, isComplete: false };
      });
    } else {
      note.type = "note";
      note.content = note.content.map((row) => row.content).join("\n");
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
          className={addNoteStyles.contentContainer}
          style={!expanded ? { marginBottom: "-0.7rem" } : null}
        >
          <div
            className={addNoteStyles.contentPlaceholder}
            onClick={() => {
              setExpanded(true);
            }}
            style={{
              zIndex: expanded ? "-50" : "0",
              display: note.content ? "none" : "block",
            }}
          >
            Note...
          </div>
          {isList ? (
            <div></div>
          ) : (
            <div
              className={addNoteStyles.content}
              style={{ display: expanded ? "block" : "none" }}
              id="note-content"
              spellCheck="true"
              contentEditable
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.execCommand("insertHTML", false, "<br><br>");
                }
              }}
              onInput={(e) => {
                note.content = e.target.innerHTML.replace(/<br>/g, "\n").trim();
                setNote(note);
                saveNote();
              }}
            />
          )}
        </Col>
      </Row>
      <Row style={!expanded ? { display: "none" } : null}>
        <Col className={addNoteStyles.col}>
          <button
            className={buttonStyles.button}
            type="button"
            onClick={() => {
              toggleList();
              saveNote();
            }}
          >
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
