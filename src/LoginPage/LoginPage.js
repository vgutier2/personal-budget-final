import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from 'axios';

function LoginPage() {

  const login = (event) => {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    axios.post("http://localhost:4000/api/login", { email, password })
      .then((res) => {
        if (res) {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          localStorage.setItem("userId", res.data.userId);
        }
      });
  };
  return (
    <div className="LoginPage">
      <Container fluid>
        <Form onSubmit={login}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id="emailInput"/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id="passwordInput" />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
export default LoginPage;
