import React, { useState, useEffect } from "react";

import { TextareaAutosize, Checkbox } from "@material-ui/core";

import addNoteStyles from "../AddNote.module.css";

function ListNoteInput({ saveNote, currentNote, setCurrentNote }) {
  const [activeRow, setActiveRow] = useState(currentNote.content.length - 1);

  useEffect(() => {
    const rowElement = document.getElementById(`content${activeRow}`);
    rowElement.focus();
    rowElement.setSelectionRange(
      rowElement.value.length,
      rowElement.value.length
    );
  }, [activeRow]);

  const handleNewLine = (e) => {
    if (e.key === "Backspace") {
      if (!e.target.value && currentNote.content.length > 1) {
        e.preventDefault();
        setCurrentNote({
          ...currentNote,
          content: currentNote.content.filter(
            (row) => row.id !== parseInt(e.target.dataset.id)
          ),
        });
        for (let i = 0; i < currentNote.content.length; i++) {
          currentNote.content[i].id = i;
        }
        setActiveRow(
          parseInt(e.target.dataset.id) === 0
            ? 0
            : parseInt(e.target.dataset.id) - 1
        );
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        const newId = parseInt(e.target.dataset.id) + 1;
        currentNote.content.splice(newId, 0, {
          id: -1,
          content: "",
          isComplete: false,
        });
        setCurrentNote({
          ...currentNote,
          content: currentNote.content.map((row, i) => {
            return { ...row, id: i };
          }),
        });
        setActiveRow(newId);
      }
    }
  };

  const handleInput = (e) => {
    currentNote.content.find(
      (row) => row.id === parseInt(e.target.dataset.id)
    ).content = e.target.value;
  };

  const handleTickBox = (e) => {
    currentNote.content.find(
      (row) => row.id === parseInt(e.target.dataset.id)
    ).isComplete = e.target.checked;
  };

  return (
    <div id="note-content">
      {currentNote.content.map((row) => {
        return (
          <div key={row.id} className={addNoteStyles.listRow}>
            <Checkbox
              className={addNoteStyles.checkbox}
              checked={row.isComplete}
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
              defaultValue={row.content}
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
