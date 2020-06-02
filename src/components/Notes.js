import React, { useContext, useState } from "react";
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
  const [inputExpanded, setExpanded] = useState(false);

  return cookies.user ? (
    <div
      className={containerStyles.container}
      onClick={() => setExpanded(false)}
    >
      <AddNote expanded={inputExpanded} setExpanded={setExpanded} />
      <Masonry disableImagesLoaded={true} options={{ fitWidth: true }}>
        {notes
          .sort((a, b) => {
            if (a.created < b.created) return 1;
            if (a.created > b.created) return -1;
            return 0;
          })
          .map((note) => (
            <Note key={note._id} note={note}></Note>
          ))}
      </Masonry>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Notes;
