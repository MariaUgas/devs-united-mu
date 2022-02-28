import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
