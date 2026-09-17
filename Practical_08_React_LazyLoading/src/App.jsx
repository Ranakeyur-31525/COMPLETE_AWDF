import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Gauge, Sparkles } from 'lucide-react';
import LazyFallback from './components/LazyFallback';
import Home from './pages/Home';

// Route-based code splitting using React.lazy (Core Requirement)
const Tasks = lazy(() => import('./pages/Tasks'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px', fontFamily: 'system-ui, sans-serif' }}>
        {/* Navigation Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid #e2e8f0', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#4f46e5', color: '#fff', padding: 8, borderRadius: 8, display: 'flex' }}>
              <Gauge size={22} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
                Practical 8: Lazy Loading & Code Splitting
              </h1>
              <span style={{ fontSize: 12, color: '#64748b' }}>React.lazy() • Suspense • Webpack/Rollup Chunks</span>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: 10 }}>
            {[
              { to: '/', label: 'Home (Eager)' },
              { to: '/tasks', label: 'Tasks (Lazy)' },
              { to: '/analytics', label: 'Analytics (Lazy)' },
              { to: '/contact', label: 'Contact (Lazy)' }
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  padding: '8px 14px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  background: isActive ? '#4f46e5' : '#f1f5f9',
                  color: isActive ? '#fff' : '#475569'
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>

        {/* Suspense Boundary wrapping Lazy Routes with Min-Delay Fallback */}
        <main>
          <Suspense fallback={<LazyFallback message="Loading route chunk via network..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}
