import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import { noteContext } from "../context/noteContext";
import Note from "./Note";
import AddNote from "./AddNote";

import Masonry from "react-masonry-component";

import containerStyles from "./Container.module.css";

function Notes() {
  const [notes] = useContext(noteContext);
  const [cookies] = useCookies(["user"]);

  return cookies.user ? (
    <React.Fragment>
      <AddNote />
      <div className={containerStyles.container}>
        <Masonry
          options={{
            gutter: 10,
            fitWidth: true,
          }}
        >
          {notes.map((note) => (
            <Note key={note._id} note={note}></Note>
          ))}
        </Masonry>
      </div>
    </React.Fragment>
  ) : (
    <Redirect to="/login" />
  );
}

export default Notes;
