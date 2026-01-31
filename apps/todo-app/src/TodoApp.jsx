import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (e) {
        console.error('Error loading todos from localStorage:', e)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodosCount = todos.filter(todo => !todo.completed).length
  const completedTodosCount = todos.filter(todo => todo.completed).length

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="todo-header">
          <h1>📝 Todo List</h1>
          <p className="subtitle">Manage your tasks efficiently</p>
        </header>

        <div className="todo-input-section">
          <div className="input-wrapper">
            <input
              type="text"
              className="todo-input"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="add-btn" onClick={addTodo}>
              Add
            </button>
          </div>
        </div>

        {todos.length > 0 && (
          <div className="todo-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({activeTodosCount})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTodosCount})
            </button>
          </div>
        )}

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {todos.length === 0 ? (
                <>
                  <p>🎯 No tasks yet!</p>
                  <p className="empty-hint">Add a task above to get started.</p>
                </>
              ) : (
                <>
                  <p>✨ No {filter} tasks!</p>
                  <p className="empty-hint">Try a different filter.</p>
                </>
              )}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {completedTodosCount > 0 && (
          <div className="todo-actions">
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed ({completedTodosCount})
            </button>
          </div>
        )}

        {todos.length > 0 && (
          <div className="todo-stats">
            <p>
              <strong>{activeTodosCount}</strong> active,{' '}
              <strong>{completedTodosCount}</strong> completed
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoApp
