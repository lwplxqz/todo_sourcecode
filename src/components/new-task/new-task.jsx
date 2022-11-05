/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task.css'

export default class NewTaskPanel extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onTaskSubmit = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.props.appendTodoItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={this.onTaskSubmit}
        onChange={this.onLabelChange}
        value={this.state.label}
      />
    )
  }
}

NewTaskPanel.defaultProps = {
  appendTodoItem: () => {},
}
NewTaskPanel.propTypes = {
  appendTodoItem: PropTypes.func,
}
