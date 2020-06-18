import React, { createContext, useState } from "react";

export const addNoteContext = createContext();

export const AddNoteProvider = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [isList, setIsList] = useState(false);
  const [newNote, setNewNote] = useState({});

  return (
    <addNoteContext.Provider
      value={[setExpanded, setIsList, setNewNote, newNote, expanded, isList]}
    >
      {props.children}
    </addNoteContext.Provider>
  );
};
