import React, { useState } from 'react';
import { 
  ToggleLeft, 
  Send, 
  Info, 
  Check, 
  Sparkles, 
  Filter, 
  Eye, 
  AlertCircle 
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Practical2_Routing({ onToast }) {
  // State 1: Controlled Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'Full-Stack'
  });

  // State 2: Educational Tooltip / State Explainer
  const [showExplainer, setShowExplainer] = useState(false);

  // State 3: Category filter for dynamic showcase
  const [selectedCategory, setSelectedCategory] = useState('all');

  const MAX_CHARS = 200;
  const charsRemaining = MAX_CHARS - formData.message.length;

  const sampleItems = [
    { id: 1, title: 'Portfolio Architecture', category: 'Frontend', tech: 'React, Vite, CSS' },
    { id: 2, title: 'Express Routing Engine', category: 'Backend', tech: 'Node.js, Express Router' },
    { id: 3, title: 'Mongoose Data Validation', category: 'Database', tech: 'MongoDB, Schemas' },
    { id: 4, title: 'Full Stack Integration', category: 'Full-Stack', tech: 'MERN Architecture' },
    { id: 5, title: 'Client-Side Navigation', category: 'Frontend', tech: 'React Router v6' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? sampleItems
    : sampleItems.filter((i) => i.category === selectedCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_CHARS) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onToast('Please fill out all required fields.', 'error');
      return;
    }
    onToast(`Thank you, ${formData.name}! Your message was captured into React state.`, 'success');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '', category: 'Full-Stack' });
    onToast('Form state reset.', 'info');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            PRACTICAL 02
          </span>
          <StatusBadge label="State Management & Routing" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          React State Management & Dynamic Routing
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
          Demonstration of controlled form inputs, live character limit calculation, dynamic category filtering, and real-time state monitoring.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        
        {/* Controlled Form Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Controlled Contact Form</h2>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowExplainer(!showExplainer)}
              title="Toggle React state explanation"
            >
              <Info size={14} />
              <span>{showExplainer ? 'Hide State Guide' : 'Explain State'}</span>
            </button>
          </div>

          {showExplainer && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '1.25rem',
              fontSize: '0.825rem',
              lineHeight: 1.5
            }}>
              <strong>💡 How Controlled State Works in React:</strong>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Every input element derives its <code>value</code> from React state (<code>formData</code>) and invokes an <code>onChange</code> handler to update state on every keystroke. React remains the "single source of truth".
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Keyur Ranak"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span style={{ color: 'var(--accent-rose)' }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="name@charusat.edu.in"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Inquiry Category
              </label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Frontend">Frontend Development</option>
                <option value="Backend">Backend & REST APIs</option>
                <option value="Database">MongoDB & Database Design</option>
                <option value="Full-Stack">Full-Stack Application</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                <span>Message <span style={{ color: 'var(--accent-rose)' }}>*</span></span>
                <span style={{
                  fontSize: '0.75rem',
                  color: charsRemaining < 20 ? 'var(--accent-rose)' : 'var(--text-dim)',
                  fontWeight: 600
                }}>
                  {charsRemaining} chars remaining
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                <Send size={16} />
                <span>Submit Form</span>
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Live State Monitor & Category Filter Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Live State Monitor */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Eye size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Real-Time State Inspector</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
              Inspect live React state JSON updated on every keystroke:
            </p>
            <div className="code-box">
              {JSON.stringify(formData, null, 2)}
            </div>
          </div>

          {/* Dynamic Category Filter */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Dynamic Category Filter</h3>
              </div>
              <StatusBadge label={`${filteredItems.length} items`} />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {['all', 'Frontend', 'Backend', 'Database', 'Full-Stack'].map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>{item.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.tech}</div>
                  </div>
                  <StatusBadge label={item.category} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
