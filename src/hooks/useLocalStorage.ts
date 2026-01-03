import { useState, useEffect } from 'react'
import type { TodoItem } from '../types'

const STORAGE_KEY = 'chronicles-todos'

export function useLocalStorage() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY)
      return item ? JSON.parse(item) : []
    } catch (error) {
      console.error('Error loading todos from localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
    }
  }, [todos])

  const addTodo = (text: string) => {
    if (text.trim() === '') return

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    }

    setTodos((prev) => [newTodo, ...prev])
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  }
}

