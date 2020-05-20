import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Note from "./Note";

function Notes() {
  const [cookies] = useCookies(["user"]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notes`, { withCredentials: true })
      .then((res) => setNotes(res.data.userNotes))
      .catch((e) => console.log(e));
  }, []);

  return cookies.user ? (
    <React.Fragment>
      <h4>NOTES</h4>
      <div>
        {notes.map((note) => (
          <Note key={note._id} note={note}></Note>
        ))}
      </div>
    </React.Fragment>
  ) : (
    <Redirect to="/login" />
  );
}

export default Notes;
