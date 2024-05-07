import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/config";

const Logout = () => {
  const handleLogout = () => {
    console.log("kk");
    signOut(auth);
  };
  return <button onClick={handleLogout}>Logout</button>;
};
export default Logout;
