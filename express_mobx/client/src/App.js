import React, { Component } from 'react'
import './App.css'

import { decorate, observable, action } from 'mobx'
import { observer } from 'mobx-react'

class App extends Component {
  number = 0

  increase = () => {
    this.number++
  }

  decrease = () => {
    this.number--
  }

  render() {
    return (
        <div className="App">
          <h1>{this.number}</h1>
          <button onClick={this.increase}>+1</button>
          <button onClick={this.decrease}>-1</button>
        </div>
    )
  }
}

decorate(App, {
  number: observable,
  increase: action,
  decrease: action
})

export default observer(App)
