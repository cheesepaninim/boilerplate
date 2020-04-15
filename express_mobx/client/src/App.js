import React, { Component } from 'react'
import './App.css'

import {inject, observer} from 'mobx-react'

@inject('counter')
// to get specific store
// @inject(store => ({
//   number: store.counter.number,
//   increase: store.counter.increase,
//   decrease: store.counter.decrease
// }))
@observer
class App extends Component {
  render() {
    const { counter } = this.props
    return (
        <div className="App">
          <h1>{counter.number}</h1>
          <button onClick={counter.increase}>+1</button>
          <button onClick={counter.decrease}>-1</button>
        </div>
    )
  }
}

export default App
