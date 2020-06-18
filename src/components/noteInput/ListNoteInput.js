import React, { useEffect } from "react";

import { TextareaAutosize, Checkbox } from "@material-ui/core";

import addNoteStyles from "../AddNote.module.css";

function ListNoteInput({ saveNote, currentNote, setCurrentNote }) {
  useEffect(() => {
    document.getElementById(`content${currentNote.content.length}`).focus();
  }, [currentNote.content.length]);

  const handleNewLine = (e) => {
    if (e.key === "Backspace") {
      if (!e.target.value && currentNote.content.length > 1) {
        e.preventDefault();
        setCurrentNote({
          ...currentNote,
          content: currentNote.content.filter(
            (row) => row.id !== currentNote.content.length
          ),
        });
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        const newId = currentNote.content.length + 1;
        setCurrentNote({
          ...currentNote,
          content: [
            ...currentNote.content,
            { id: newId, content: "", isComplete: false },
          ],
        });
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
