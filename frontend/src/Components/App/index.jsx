import React, { Component } from "react";
import axios from 'axios'
import "./App.css";
import List from "../List";
import Add from "../Add";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5050/')
      .then((response) => {
        this.setState({
          toDoList: response.data
        })
      })
  }

  addHandler = task => {
    axios.post('http://localhost:5050/', task )
      .then((response) => {
        let tempTodo = {
          text: response.data.text,
          done: response.data.done
        }
        let tempArray = this.state.toDoList
        tempArray.push(tempTodo)
        this.setState({
          toDoList: tempArray
        })
      }).catch((error) => {
        console.log(error)
      })
  };

  statChange = id => {
    let completed = this.state.toDoList;
    completed.forEach((task) => {
      if (task) {
        console.log(task)
      }
    });
  };

  deleteAll = () => {
    //to debug...
    if (!this.state.status === false) {
      this.setState({ toDoList: [] });
    }
    return;
  };

  render() {
    return (
      <div className="toDoApp">
        <a
          onClick={this.deleteAll}
          id="trash"
          className="btn-floating btn-large waves-effect waves-light teal accent-2"
        >
          <i className="material-icons trash">delete_forever</i>
        </a>
        <h1> GET SH!T DONE</h1>
        <Add addHandler={this.addHandler} />
        <List
          toDoList={this.state.toDoList}
          status={this.state.status}
          statChange={this.statChange}
        />
      </div>
    );
  }
}

export default App;
