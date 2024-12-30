import React, { useState, useEffect } from 'react';

const ClockAndTodo = () => {
  const [time, setTime] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle adding new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Clock Section (70% height) */}
      <div className="h-[70vh] flex items-center justify-center border-b border-white">
        <div className="text-8xl font-mono">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Todo Section (30% height) */}
      <div className="h-[30vh] p-6 overflow-auto">
        <h2 className="text-2xl mb-4">Todo List</h2>
        
        {/* Todo Form */}
        <form onSubmit={addTodo} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo..."
            className="flex-1 p-2 bg-white text-black rounded"
          />
          <button type="submit" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
            Add
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center gap-2 bg-white/10 p-2 rounded">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 bg-white text-black rounded hover:bg-gray-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClockAndTodo;