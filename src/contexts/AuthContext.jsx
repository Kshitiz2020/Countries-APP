import { useContext, createContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/config";

const AuthContext = createContext(null); // createContext. this is the 1step to create the context

const useAuth = () => {
  return useContext(AuthContext);
}; // useAuth ready to use in other components

function AuthContextProvider({ children }) {
  const getUser = auth.currentUser;

  //const authState = onAuthStateChanged(auth);
  return (
    <AuthContext.Provider value={{ getUser }}>{children}</AuthContext.Provider> // 2nd step  here children is APP.jsx (see the main.jsx for what is children)
  );
}
export { AuthContextProvider, useAuth };
