import React from "react";

function Note(props) {
  return (
    <div>
      <h4>{props.note.title}</h4>
      <p>{props.note.content}</p>
    </div>
  );
}

export default Note;
