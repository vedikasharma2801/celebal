import React from 'react';
import './TodoItem.css';

function TodoItem({ task, onToggleComplete, onRemoveTask }) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button onClick={() => onRemoveTask(task.id)} className="remove-btn">
        Remove
      </button>
    </li>
  );
}

export default TodoItem;