import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import AboutAPI from './pages/AboutAPI';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/about-api" element={<AboutAPI />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
