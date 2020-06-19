import React from "react";
import { createContext, useState } from "react";

export const modalContext = createContext();

export const ModalProvider = (props) => {
  const [editHidden, setEditHidden] = useState(true);
  const [shareHidden, setShareHidden] = useState(true);
  const [note, setNote] = useState({});

  return (
    <modalContext.Provider
      value={[
        editHidden,
        setEditHidden,
        note,
        setNote,
        shareHidden,
        setShareHidden,
      ]}
    >
      {props.children}
    </modalContext.Provider>
  );
};
