import axios from "axios";

export const createNote = async (note, callback = undefined) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/notes`,
      { note },
      { withCredentials: true }
    );
    if (callback) callback(response.data.savedNote);
  } catch (e) {
    console.log(e);
  }
};

export const editNote = async (note, callback = undefined) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/notes`,
      { note },
      { withCredentials: true }
    );
    if (callback) callback(response.data.editedNote);
  } catch (e) {
    console.log(e);
  }
};

export const deleteNote = async (note, callback = undefined) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${note._id}`, {
      withCredentials: true,
    });
    if (callback) callback();
  } catch (e) {
    console.log(e);
  }
};

export const shareNote = async (
  { noteId, userEmail },
  callback = undefined
) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/notes/share`,
      { userEmail, noteId },
      { withCredentials: true }
    );
    if (callback) callback();
  } catch (e) {
    console.log(e);
  }
};
