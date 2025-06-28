import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import Player from './components/Player/Player';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';

function App() {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="app-container">
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
      {activeSong?.title && (
        <div className="player-container">
          <Player />
        </div>
      )}
    </div>
  );
}

export default App;