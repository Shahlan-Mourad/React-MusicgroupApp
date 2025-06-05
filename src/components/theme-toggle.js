import React from 'react';
import { Button } from 'react-bootstrap';
import { Sun, Moon } from 'react-bootstrap-icons';

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <Button
      variant="link"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
}

export default ThemeToggle; 