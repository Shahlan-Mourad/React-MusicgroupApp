import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation';
import Footer from './components/footer';
import Home from './pages/home';
import MusicGroup from './pages/music-group';
import MusicGroupDetail from './components/music-group-detail';
import ThemeToggle from './components/theme-toggle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/theme.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music-groups" element={<MusicGroup />} />
            <Route path="/music-groups/:id" element={<MusicGroupDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
