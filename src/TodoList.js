import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  useEffect(() => {
    console.log('Retrieving todos from localStorage');
    const savedTodos = localStorage.getItem('todos');
    console.log('savedTodos:', savedTodos);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error(error);
    }
  }, [todos]);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo) => {
    setSelectedTodo(todo);
    setEditedTodo(todo.text);
  };

  const handleEditedTodoChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleCancelEdit = () => {
    setSelectedTodo(null);
    setEditedTodo('');
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === selectedTodo.id ? { ...todo, text: editedTodo } : todo
    );
    setTodos(updatedTodos);
    setSelectedTodo(null);
    setEditedTodo('');
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="todo-list">
        <h1>To Do List</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                {selectedTodo?.id === todo.id ? (
                  <form onSubmit={handleUpdateTodo}>
                    <input
                      type="text"
                      value={editedTodo}
                      onChange={handleEditedTodoChange}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{todo.text}</span>
                    <div className="button-group">
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleEditTodo(todo)}>Edit</button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleNewTodoSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            placeholder="Add a new item..."
          />
         

          <button type="submit">Add</button>
        </form>

      </div>
    </div>

  );
}

export default TodoList;









