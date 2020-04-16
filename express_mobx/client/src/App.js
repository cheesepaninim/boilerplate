import React, { Component } from 'react'
import './App.css'

import Counter from './component/Counter'
import CounterWithHook from "./component/CounterWithHook";

class App extends Component {
  render() {

    return (
        <div className="App">
          {/* Counter with class */}
          <Counter/>
          {/* Counter with function */}
          <CounterWithHook/>
        </div>
    )
  }
}

export default App
