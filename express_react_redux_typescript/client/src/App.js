import React from "react"
import Footer from "./components/Layout/Footer"
import AddTodo from "./containers/AddTodo"
import VisibleTodoList from "./containers/VisibleTodoList"

const App = () => {
  return (
      <>
        <div>Hello React!</div>
        <div>with redux, react-helmet, typescript, express</div>

        <div>
          <AddTodo/>
          <VisibleTodoList/>
          <Footer/>
        </div>
      </>
  )
}

export default App
