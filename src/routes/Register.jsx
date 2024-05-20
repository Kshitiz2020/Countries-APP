import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear error state
    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return;
    }

    try {
      /* const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await updateProfile(user, { displayName: name }) */

      await signUp(email, password, name);

      // Navigate to the countries page after successful registration
      setRegisteredSuccessfully(true);
      navigate("/countries");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-50 mt-5 mx-auto p-4">
      <Card.Body>
        <Card.Title className="text-center">
          Register for your virtual tour
        </Card.Title>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Control
              type="password"
              placeholder="Re-Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Register
          </Button>
          {registeredSuccessfully && (
            <p className="mt-3 text-success">Registered Successfully</p>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;
