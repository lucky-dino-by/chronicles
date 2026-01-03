import { useState, FormEvent } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useLocalStorage()
  const [inputValue, setInputValue] = useState('')
  const currentDate = formatDate(new Date())

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="date">{currentDate}</h1>
      </header>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">No items yet. Add one below.</div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-item-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                  className={`todo-item-text ${todo.completed ? 'completed' : ''}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete "${todo.text}"`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new item..."
          aria-label="Add new todo item"
        />
        <button
          type="submit"
          className="add-button"
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default App

