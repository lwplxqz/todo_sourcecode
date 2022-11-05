/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import * as ReactDOMClient from 'react-dom/client'

import './index.css'

import AppHeader from './components/app-header/app-header'
import TodoList from './components/todo-list/todo-list'
import Footer from './components/footer/footer'

const root = ReactDOMClient.createRoot(document.querySelector('.app'))

class App extends Component {
  constructor(){
    super(),
    this.state = {
      todoData: [
        this.createTodoItem('Drink Cofee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Take a break'),
      ],
      filter: 'all',
    }
  }

  maxId() {
    return Math.random(1, 500)
  }

  filter(items, filter) {
    switch (filter) {
    case 'all':
      return items
    case 'active':
      return items.filter((item) => !item.done)
    case 'completed':
      return items.filter((item) => item.done)
    default:
      return items
    }
  }

  editLabel = (label, id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id)

      return {
        todoData: [...todoData.slice(0, itemIdx), {...todoData[itemIdx], label: label},...todoData.slice(itemIdx + 1)],
      }
    })
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId(),
    }
  }

  appendTodoItem(label) {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, this.createTodoItem(label)],
    }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id)

      return {
        todoData: [...todoData.slice(0, itemIdx), ...todoData.slice(itemIdx + 1)],
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id)

      const oldItem = todoData[itemIdx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArr = [...todoData.slice(0, itemIdx), newItem, ...todoData.slice(itemIdx + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  switchFilter = (filter) => {
    this.setState({
      filter,
    })
  }

  clearCompleted = () => {
    this.setState({
      todoData: this.state.todoData.filter((item) => !item.done),
    })
  }

  render() {
    const { todoData, filter } = this.state

    const todoLeft = todoData.filter((el) => !el.done).length

    const itemsToRender = this.filter(todoData, filter)

    return (
      <section className="todoapp">
        <AppHeader appendTodoItem={this.appendTodoItem.bind(this)} />
        <section className="main">
          <TodoList todos={itemsToRender} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} editLabel={this.editLabel}/>
          <Footer
            left={todoLeft}
            filter={filter}
            switchFilter={this.switchFilter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

root.render(<App />)
