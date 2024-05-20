import { useContext, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/config";

const AuthContext = createContext(null); // createContext. this is the 1step to create the context

const useAuth = () => {
  return useContext(AuthContext);
}; // useAuth ready to use in other components

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const changeStates = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      changeStates();
    };
  }, []);

  const signUp = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: displayName });
    await setDoc(doc(db, "users", userCredential?.user.uid), {
      email: email,
      fav: [],
    });
    return true;
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn }}>
      {children}
    </AuthContext.Provider> // 2nd step  here children is APP.jsx (see the main.jsx for what is children)
  );
}
export { AuthContextProvider, useAuth };
