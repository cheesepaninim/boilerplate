import React, { Component } from 'react'
import './App.css'

import Counter from './component/Counter'

class App extends Component {
  render() {

    return (
        <div className="App">
          {/* Counter with class */}
          <Counter/>
        </div>
    )
  }
}

export default App
