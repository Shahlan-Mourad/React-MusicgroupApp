import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MusicGroup from './pages/MusicGroup';
import MusicGroupDetail from './components/MusicGroupDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<MusicGroup />} />
          <Route path="/groups/:id" element={<MusicGroupDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
