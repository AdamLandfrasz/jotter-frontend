import React, { useContext, useEffect, useState } from "react";
import { shareNote } from "../http";
import { modalContext } from "../context/modalContext";

import modalStyles from "./Modal.module.css";
import buttonStyles from "./Button.module.css";

function EditModal() {
  const [, , note, , hidden, setHidden] = useContext(modalContext);
  const [shareEmail, setShareEmail] = useState("");

  useEffect(() => {
    if (hidden) {
      document.querySelector("body").style = "";
    } else {
      document.querySelector("body").style.overflow = "hidden";
    }
  }, [hidden]);

  const handleShare = (e) => {
    shareNote({ noteId: note._id, userEmail: shareEmail }, (res) => {
      if (res.success) {
        setHidden(true);
      }
    });
  };

  return hidden ? null : (
    <div className={modalStyles.pageMask} onClick={() => setHidden(true)}>
      <div
        className={modalStyles.shareModal}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          name="title"
          id="edit-note-title"
          placeholder="Email address to share with..."
          spellCheck="true"
          autoComplete="off"
          className={modalStyles.shareInput}
          onChange={(e) => setShareEmail(e.target.value)}
        />
        <button className={buttonStyles.button} onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
}

export default EditModal;
