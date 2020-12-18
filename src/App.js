import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import Navigation from "./Navigation/Navigation"
import Login from "./LoginPage/LoginPage"
import SignUp from "./SignUpPage/SignUpPage"
import Dashboard from "./Dashboard/Dashboard"

export default class App extends Component {
  state = {};

  componentDidMount = () => {
    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    axios.get('http://localhost:4000/api/dashboard/', config).then( 
        res => {
            this.setState({
                user: res.data
            })
        },
        err => {
            console.log(err);
        }
    )
  };
  render() {
    return (
      <Router>
        <Navigation user={this.state.user}/>
        <div className="App">
          <Switch>
            <Route path="/dashboard" component={() => <Dashboard user={this.state.user}/>} />
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}