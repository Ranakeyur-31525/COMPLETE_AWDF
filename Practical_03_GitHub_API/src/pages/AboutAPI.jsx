import React from 'react';
import { BookOpen, Layers, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

function AboutAPI() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">
          <BookOpen size={32} color="var(--accent-purple)" /> REST API Concepts & Architecture
        </h1>
        <p className="page-description">
          Understanding asynchronous data fetching, React lifecycle hooks, and request state handling in modern single-page applications.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} /> 1. The `useEffect` Hook
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            In React functional components, side-effects like HTTP requests must be placed inside <code>useEffect()</code> rather than the main component body. Passing an empty dependency array <code>[]</code> ensures the fetch fires exactly once when the component mounts.
          </p>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ color: 'var(--warning)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={20} /> 2. Three State Paradigm
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Asynchronous operations require tracking 3 distinct state variables:
          </p>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
            <li><code>data</code> (Array/Object): Stores API response payloads.</li>
            <li><code>loading</code> (Boolean): Controls spinner visibility.</li>
            <li><code>error</code> (String/Null): Stores failure messages.</li>
          </ul>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={20} /> 3. Graceful Error Handling
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Wrapping network requests in <code>try/catch/finally</code> or <code>.catch().finally()</code> guarantees that <code>loading</code> returns to <code>false</code> regardless of whether the HTTP request succeeded or failed, preventing infinite loading spinners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutAPI;
