import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config"; // Ensure you import your Firebase auth configuration

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Successfully logged in
      const user = userCredential.user;
      //console.log("User logged in:", user);
      navigate("/countries");
    } catch (error) {
      alert.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
      Not a member yet? <a href="/register">Register</a>
    </div>
  );
};

export default Login;
