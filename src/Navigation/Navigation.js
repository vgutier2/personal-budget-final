import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';

export default class Navigation extends Component {
    render() {
        let loggedOut;

        if(this.props.user){
            loggedOut = (
                <Nav.Item> 
                    <Nav.Link to={"/Dashboard/"} onClick={() => localStorage.clear()}>Logout</Nav.Link>
                </Nav.Item>
            )
        } else {
            loggedOut = (
                <Nav.Item> 
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
            )
        }

        return (
            <Nav>
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              {loggedOut}
            </Nav>
          );
    }
}