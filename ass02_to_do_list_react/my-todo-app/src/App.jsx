import React from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React To-Do List</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <p>My Simple To-Do App</p>
      </footer>
    </div>
  );
}

export default App;