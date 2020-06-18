import React, { useState, useContext } from "react";
import { createNote, editNote, deleteNote } from "../http";
import { noteContext } from "../context/noteContext";
import { addNoteContext } from "../context/addNoteContext";

import NoteInput from "./noteInput/NoteInput";
import ListNoteInput from "./noteInput/ListNoteInput";
import { Row, Col } from "react-bootstrap";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import addNoteStyles from "./AddNote.module.css";
import buttonStyles from "./Button.module.css";

const AddNote = () => {
  const [
    setExpanded,
    setIsList,
    setNewNote,
    newNote,
    expanded,
    isList,
  ] = useContext(addNoteContext);
  const [notes, setNotes] = useContext(noteContext);
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
            <ListNoteInput
              saveNote={saveNote}
              currentNote={newNote}
              setCurrentNote={setNewNote}
            />
          ) : (
            <NoteInput
              onClick={() => setExpanded(true)}
              saveNote={saveNote}
              currentNote={newNote}
            />
          )}
        </Col>
      </Row>
      {expanded ? (
        <Row>
          <Col className={addNoteStyles.btnCol}>
            <button
              className={buttonStyles.iconButton}
              type="button"
              onClick={() => {
                toggleList();
              }}
            >
              {isList ? <AssignmentIcon /> : <CheckBoxIcon />}
            </button>
            <button className={buttonStyles.iconButton} type="submit">
              <ExitToAppIcon />
            </button>
          </Col>
        </Row>
      ) : null}
    </form>
  );
};

export default AddNote;
