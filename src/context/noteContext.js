import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const noteContext = createContext();

export const NoteProvider = (props) => {
  const [cookies] = useCookies();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!cookies.user) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/notes`, { withCredentials: true })
      .then((res) => setNotes(res.data.userNotes))
      .catch((e) => console.log(e));
  }, [cookies.user]);

  return (
    <noteContext.Provider value={[notes, setNotes]}>
      {props.children}
    </noteContext.Provider>
  );
};
