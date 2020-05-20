import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import { noteContext } from "../context/noteContext";
import Note from "./Note";
import AddNote from "./AddNote";

function Notes() {
  const [notes] = useContext(noteContext);
  const [cookies] = useCookies(["user"]);

  return cookies.user ? (
    <React.Fragment>
      <AddNote />
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
