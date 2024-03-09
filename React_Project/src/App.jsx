import "./styles.css"
import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])
  const [isEditing, setEditing] = useState(false)
  //setNewItem
  function handleSubmit(e) {
    e.preventDefault()

    setTodos((currentTodos) => {
      return [
        ...currentTodos, 
        {id: crypto.randomUUID(), title: newItem, completed: false, isEditing: false},
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function editTodo(id, text) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, title : text}
        }
        return todo
      })
    })
  }

  function handleEditClick(id, text) {
    const newContent = prompt("Edit: ", text)
    return (newContent.length === 0 ? editTodo(id, text) : editTodo(id, newContent))
  }

  return (
    <div className = "container">
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className = "form-row">
          <label htmlFor = "item"> New Item</label>
          <input 
            value={newItem} 
            onChange={e=>setNewItem(e.target.value)}
            type="text" 
            id="item"/>
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
          <li key={todo.id}>
            <label>
              <input type='checkbox' checked={todo.completed}
              onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger"> Delete</button>
            <button onClick={() => handleEditClick(todo.id,todo.title)} className = "btn btn-edit">Edit</button>
          </li>
          )
        })} 
      </ul>
      </div>
  )
}