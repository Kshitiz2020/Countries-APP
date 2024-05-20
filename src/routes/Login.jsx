import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/countries");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Form className="w-50 mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" onClick={loginUser} type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Not a member yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
