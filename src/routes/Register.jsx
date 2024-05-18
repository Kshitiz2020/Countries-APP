import React, { useState } from "react";
import { auth } from "../config/config";
//firebase imported

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      // console.log("password should match");

      return;
    }
    //console.log(email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        updateProfile(auth.currentUser, {
          displayName: name,
        });

        const user = userCredential.user;
        // Navigate to the countries page after successful registration
        setRegisteredSuccessfully(true);
        navigate("/countries");

        // ...
        //console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };
  return (
    <form onSubmit={handleRegister}>
      <h1>Register for your virtual tour</h1>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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

      <button>Register</button>
      {registeredSuccessfully && <p>registeredSuccessfully </p>}
    </form>
  );
};
export default Register;
