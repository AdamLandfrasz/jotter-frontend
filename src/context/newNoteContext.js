import React, { createContext, useState } from "react";

export const newNoteContext = createContext();

export const NewNoteProvider = (props) => {
  const [newNote, setNewNote] = useState({});
  const [isList, setIsList] = useState(false);

  return (
    <newNoteContext.Provider value={[newNote, setNewNote, isList, setIsList]}>
      {props.children}
    </newNoteContext.Provider>
  );
};
