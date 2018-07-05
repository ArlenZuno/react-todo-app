import React, { Component } from "react";
import ToDo from "./ToDo";

class List extends Component {
  
  render() {
    let listJSX;
    if (this.props.toDoList.length <= 0) {
      listJSX = <h3>Loading shit...</h3>;
    } else {
      listJSX = this.props.toDoList.map(element => {
      return (
        <div>
        <ToDo
          key={element.text}
          task={element.text}
          status={element.done}
          statChange={this.props.statChange}
        />
        </div>
      )
    });
  }
    return (
        <div>{listJSX}</div> 
    )
  }
}

export default List;
