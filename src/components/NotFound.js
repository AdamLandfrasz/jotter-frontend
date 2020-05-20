import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div>404 NOT FOUND</div>
      <Link to="/">HOME</Link>
    </React.Fragment>
  );
};

export default NotFound;
