import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { noteContext } from "../context/noteContext";
import { addNoteContext } from "../context/addNoteContext";

import Note from "./Note";
import ListNote from "./ListNote";
import AddNote from "./AddNote";

import Masonry from "react-masonry-component";

import containerStyles from "./Container.module.css";

function Notes() {
  const [setExpanded, setIsList, setNewNote] = useContext(addNoteContext);
  const [notes] = useContext(noteContext);
  const [cookies] = useCookies(["user"]);

  return cookies.user ? (
    <div
      className={containerStyles.container}
      onClick={() => {
        setExpanded(false);
        setIsList(false);
        setNewNote({});
        document.querySelector("#note-content").value = "";
      }}
    >
      <AddNote />
      <Masonry disableImagesLoaded={true} options={{ fitWidth: true }}>
        {notes
          .sort((a, b) => {
            if (a.created < b.created) return 1;
            if (a.created > b.created) return -1;
            return 0;
          })
          .map((note) => {
            if (Array.isArray(note.content)) {
              return <ListNote key={note._id} note={note} />;
            } else {
              return <Note key={note._id} note={note} />;
            }
          })}
      </Masonry>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Notes;
