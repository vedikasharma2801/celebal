// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import SuccessPage from './components/SuccessPage';
import './App.css'; // Main app styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;