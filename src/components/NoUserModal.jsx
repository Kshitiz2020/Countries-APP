import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NoUserModel({ showNoUserModel, setShowNoUserModel }) {
  return (
    <Modal show={showNoUserModel} onHide={() => setShowNoUserModel(false)}>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          Please <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Register</Link>
        </p>
      </Modal.Body>
    </Modal>
  );
}
