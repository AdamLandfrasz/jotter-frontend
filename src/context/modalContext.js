import React from "react";
import { createContext, useState } from "react";

export const modalContext = createContext();

export const ModalProvider = (props) => {
  const [hidden, setHidden] = useState(true);
  const [note, setNote] = useState({});

  return (
    <modalContext.Provider value={[hidden, setHidden, note, setNote]}>
      {props.children}
    </modalContext.Provider>
  );
};
