import React, { useState, useEffect, useCallback } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const LOCAL_STORAGE_KEY = 'react-todo-list-tasks';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'text'
  const [error, setError] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
        setTasks([]); // Fallback to empty array if parsing fails
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTaskText(e.target.value);
    if (error) setError(''); // Clear error when user types
  };

  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent form submission if wrapped in a form
    if (!newTaskText.trim()) {
      setError('Task text cannot be empty.');
      return;
    }
    if (tasks.some(task => task.text.toLowerCase() === newTaskText.trim().toLowerCase())) {
      setError('This task already exists.');
      return;
    }
    const newTask = {
      id: Date.now(), // Simple unique ID
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(), // For potential date-based sorting
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
    setError('');
  };

  const handleToggleComplete = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'text') {
      return a.text.localeCompare(b.text);
    }
    // Default to sorting by date (id or createdAt)
    // Assuming newer tasks have higher IDs or later createdAt
    return new Date(b.createdAt) - new Date(a.createdAt); // Most recent first
  });

  return (
    <div className="todo-list-container">
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          aria-label="New task input"
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <div className="controls">
        <div className="filter-controls">
          <label htmlFor="filter">Filter: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="sort-controls">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="date">Date (Newest)</option>
            <option value="text">Text (A-Z)</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 && filter === 'all' && (
        <p className="empty-state">No tasks yet. Add one above!</p>
      )}
      {sortedTasks.length === 0 && filter !== 'all' && (
        <p className="empty-state">No tasks match the current filter.</p>
      )}

      <ul className="tasks-list">
        {sortedTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onRemoveTask={handleRemoveTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;