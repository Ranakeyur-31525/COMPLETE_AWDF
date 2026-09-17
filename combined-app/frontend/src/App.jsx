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
import Practical7_Auth from './pages/Practical7_Auth';
import Practical8_LazyLoading from './pages/Practical8_LazyLoading';
import Practical9_Caching from './pages/Practical9_Caching';
import Practical10_EventDriven from './pages/Practical10_EventDriven';
import Practical11_Docker from './pages/Practical11_Docker';
import Practical12_CICD from './pages/Practical12_CICD';
import Practical13_AI from './pages/Practical13_AI';

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
            <Route path="/p7" element={<Practical7_Auth onToast={addToast} />} />
            <Route path="/p8" element={<Practical8_LazyLoading onToast={addToast} />} />
            <Route path="/p9" element={<Practical9_Caching onToast={addToast} />} />
            <Route path="/p10" element={<Practical10_EventDriven onToast={addToast} />} />
            <Route path="/p11" element={<Practical11_Docker onToast={addToast} />} />
            <Route path="/p12" element={<Practical12_CICD onToast={addToast} />} />
            <Route path="/p13" element={<Practical13_AI onToast={addToast} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </BrowserRouter>
  );
}
