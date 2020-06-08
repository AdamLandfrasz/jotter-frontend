import React, { useContext } from "react";

import { TextareaAutosize, Checkbox } from "@material-ui/core";
import { newNoteContext } from "../../context/newNoteContext";

import addNoteStyles from "../AddNote.module.css";

function ListNoteInput({ saveNote }) {
  const [newNote, setNewNote] = useContext(newNoteContext);

  const handleNewLine = (e) => {
    if (e.key === "Backspace") {
      if (!e.target.value && newNote.content.length > 1) {
        e.preventDefault();
        const newId = newNote.content.length - 1;
        setNewNote({
          ...newNote,
          content: newNote.content.filter(
            (row) => row.id !== newNote.content.length
          ),
        });
        document.getElementById(`content${newId}`).focus();
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        const newId = newNote.content.length + 1;
        setNewNote({
          ...newNote,
          content: [
            ...newNote.content,
            { id: newId, content: "", isComplete: false },
          ],
        });
        setTimeout(() => {
          const newLine =
            document.getElementById(`content${newId}`) || undefined;
          if (newLine) newLine.focus();
        }, 100);
      }
    }
  };

  const handleInput = (e) => {
    newNote.content.find(
      (row) => row.id === parseInt(e.target.dataset.id)
    ).content = e.target.value;
  };

  const handleTickBox = (e) => {
    newNote.content.find(
      (row) => row.id === parseInt(e.target.dataset.id)
    ).isComplete = e.target.checked;
  };

  return (
    <div id="note-content">
      {newNote.content.map((row) => {
        return (
          <div key={row.id} className={addNoteStyles.listRow}>
            <Checkbox
              className={addNoteStyles.checkbox}
              inputProps={{ "data-id": `${row.id}` }}
              onChange={(e) => {
                handleTickBox(e);
                saveNote();
              }}
            />
            <TextareaAutosize
              className={addNoteStyles.content}
              data-id={row.id}
              id={`content${row.id}`}
              spellCheck="true"
              placeholder="List item"
              onKeyDown={handleNewLine}
              onInput={(e) => {
                handleInput(e);
                saveNote();
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListNoteInput;
