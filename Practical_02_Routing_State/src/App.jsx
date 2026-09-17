import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // useState: Dark/Light Mode Theme Toggle State
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${!darkMode ? 'light-theme' : ''}`}>
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
