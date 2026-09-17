import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ fontWeight: 600 }}>
          &copy; {new Date().getFullYear()} Ranak | CHARUSAT University (CSPIT-IT)
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          ITUE301: Advanced Web Development Frameworks — Practical 3: API Integration & Data Rendering in React
        </p>
      </div>
    </footer>
  );
}

export default Footer;
