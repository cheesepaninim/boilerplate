import React, { ReactPropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo }) => (
    <ul>
      {todos.map(todo => (
          <Todo key={todo.id} {...todo} onClick={_ => toggleTodo(todo.id)}/>
      ))}
    </ul>
)

TodoList.propTypes = {
  todos:  PropTypes.arrayof(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
}

export default TodoList
