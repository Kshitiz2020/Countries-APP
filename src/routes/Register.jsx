import React, { useState } from "react";
import { auth } from "../config/config";
//firebase imported

import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const handleRegister = async () => {
    if (confirmPassword !== password) {
      console.log("password should match");
      return;
    }
    console.log(email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setRegisteredSuccessfully(true);

        // ...
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <h1>Register for your virtual tour</h1>
      <input
        type="text"
        id="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        id="confirm-password"
        placeholder="Re-Enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      {registeredSuccessfully && <p>registeredSuccessfully </p>}
    </div>
  );
};
export default Register;
