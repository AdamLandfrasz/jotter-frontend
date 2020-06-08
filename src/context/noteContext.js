import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const noteContext = createContext();

export const NoteProvider = (props) => {
  const [cookies] = useCookies();
  const [notes, setNotes] = useState([]);

  const updateNotes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notes`, { withCredentials: true })
      .then((res) => setNotes(res.data.userNotes))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!cookies.user) return;
    updateNotes();
  }, [cookies.user]);

  return (
    <noteContext.Provider value={[notes, setNotes, updateNotes]}>
      {props.children}
    </noteContext.Provider>
  );
};
