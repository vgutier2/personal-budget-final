import React, { Component, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

class Dashboard extends Component {
  state = {
    category: "",
    amount: "",
    data: {
      labels: [],
      datasets: [
        {
          label: [],
          data: [],
          backgroundColor: [],
        },
      ],
    },
  };

  submitCategory = (event) => {
    this.setState({ category: event.target.category });
  };

  submitAmount = (event) => {
    this.setState({ amount: event.target.amount });
  };

  async componentDidMount() {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.get("http://localhost:4000/api/budget/" + localStorage.getItem("userId"), config)
      .then ((res) => {
        let tempData = this.state.data;
        for (let i = 0; i < res.data.length; i++) {
          tempData.datasets[0].data[i] = res.data[i].amount;
          tempData.labels[i] = res.data[i].category;
          tempData.datasets[0].backgroundColor[i] = res.data[i].color;
        }

        this.setState({
          data: Object.assign({}, this.state.data, {
            data: tempData,
          }),
        })
      })
      .catch(error => {
        console.log(error)
    })
  }

  addValues = (event) => {
      event.preventDefault(event);
    const token = localStorage.getItem("jwt");
    axios.post('http://localhost:4000/api/addCategory', {
        category: this.state.category,
        amount: this.state.amount,
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        userId: localStorage.getItem("userId")
    }, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((res) => {
        let tempData = this.state.data;
        tempData.datasets[0].data.push(res.data[0].amount);
        tempData.labels.push(res.data[0].category);
        tempData.datasets[0].data.backgroundColor[0] = res.data[0].color;
        this.setState({ ata: Object.assign({}, this.state.data, {
            data: tempData,
          }), })
    })
    .catch(error => {
        console.log(error)
    })
  }

  render() {
    if(this.props.user){
        return (
        <div>
        <h1>Charts</h1>
        <div>
          <Container>
            <Form onSubmit={this.addValues}>
              <Form.Group>
                <Form.Label>Budget category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter budget category"
                  id="categoryInput"
                  value={this.state.category}
                  onChange={this.submitCategory}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Budget amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter budget value"
                  id="budgetInput"
                  value={this.state.amount}
                  onChange={this.submitAmount}
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
          <div style={{ height: "500px", width: "500px" }}>
          <Pie data={this.state.data} height={400} width={400} />
          <Line data={this.state.data} height={400} width={400} />
          <Bar data={this.state.data} height={400} width={400} />
        </div>
        </div>
        </div>
        )
        
    }
    return (
        <div>
            <h2>Welcome to your personal budget app,</h2>
            <h3>please login if you have an account with us!</h3>

        </div>
    );
  }
}
export default Dashboard;
