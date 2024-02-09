import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext(null);

const MyContextProvider = (props) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const contextValue = {
    isMobile,
    setIsMobile,
    handleResize,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
