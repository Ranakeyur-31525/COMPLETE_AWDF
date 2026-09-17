import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';

import Dashboard from './pages/Dashboard';
import Practical1_Portfolio from './pages/Practical1_Portfolio';
import Practical2_Routing from './pages/Practical2_Routing';
import Practical3_GitHub from './pages/Practical3_GitHub';
import Practical4_Express from './pages/Practical4_Express';
import Practical5_MongoDB from './pages/Practical5_MongoDB';
import Practical6_FullStack from './pages/Practical6_FullStack';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('awdf-theme') || 'dark';
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('awdf-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard onToast={addToast} />} />
            <Route path="/p1" element={<Practical1_Portfolio onToast={addToast} />} />
            <Route path="/p2" element={<Practical2_Routing onToast={addToast} />} />
            <Route path="/p3" element={<Practical3_GitHub onToast={addToast} />} />
            <Route path="/p4" element={<Practical4_Express onToast={addToast} />} />
            <Route path="/p5" element={<Practical5_MongoDB onToast={addToast} />} />
            <Route path="/p6" element={<Practical6_FullStack onToast={addToast} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </BrowserRouter>
  );
}
