import React, { Component } from "react";
import uniqid from 'uniqid';

class Add extends Component {
    constructor() {
        super()
        this.state={newAdd: {}}
    }

    submitHandler = (e) => {
        if(this.refs.task.value === '') {
            alert('Get it together')
            return
        }
        this.setState({newAdd: { text: this.refs.task.value, done: false}},
        function() {
            this.props.addHandler(this.state.newAdd)
        })
        this.refs.task.value = ''
        e.preventDefault()
    }

    render() {
      return (
        <form className="col s12">
          <div className="input-field center-align col s6">
            <input
              id="DO MORE SH!T"
              name="task"
              type="text"
              ref='task'
            //   className="teal-text accent-2"
              onSubmit={this.props.addHandler.bind(this)}
            /> <label id='inputLabel' htmlFor='DO MORE SH!T'>DO MORE SH!T</label>
  
            <a className="waves-effect waves-light btn-small teal accent-2"
                onClick={this.submitHandler.bind(this)}>
              SEND IT
            </a>
          </div>
        </form>
      );
    }
  }
  
  export default Add;