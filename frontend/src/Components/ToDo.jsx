import React, { Component } from "react";

class ToDo extends Component {

  render() {
    return (
      <label id="todoList">
        <input type="checkbox" ref='status' onClick={() => {this.props.statChange(this.props.task)}} />
        <span>{this.props.task}</span>
        <br />
      </label>
    );
  }
}

export default ToDo;