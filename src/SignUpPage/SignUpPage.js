import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";

function SignUpPage() {

  const [firstName, newFirstName] = useState({})
  const [lastName, newLastName] = useState({})
  const [email, newEmail] = useState({})
  const [password, newPassword] = useState({})

  const pushFirstName = (event) => {
    newFirstName(event.target.value);
  };

  const pushLastName = (event) => {
    newLastName(event.target.value);
  };

  const pushEmail = (event) => {
    newEmail(event.target.value);
  };

  const pushPassword = (event) => {
    newPassword(event.target.value);
  };

  const signUp = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/signup', { firstName, lastName, email, password });
  }

  return (
    <div className="SignUpPage">
      <Container fluid>
        <Form onSubmit={signUp}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              id="firstNameInput"
              onChange={pushFirstName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              id="lastNameInput"
              onChange={pushLastName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="emailInput"
              onChange={pushEmail}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="passwordInput"
              onChange={pushPassword}
            />
          </Form.Group>
          <Button variant="dark" type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
}
export default SignUpPage;


