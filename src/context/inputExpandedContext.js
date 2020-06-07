import React, { createContext, useState } from "react";

export const inputExpandedContext = createContext();

export const InputExpandedProvider = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <inputExpandedContext.Provider value={[expanded, setExpanded]}>
      {props.children}
    </inputExpandedContext.Provider>
  );
};
