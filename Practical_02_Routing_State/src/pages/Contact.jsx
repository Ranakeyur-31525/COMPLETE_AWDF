import React, { useState } from 'react';
import { Mail, Send, HelpCircle, Eye, CheckCircle, MessageSquare } from 'lucide-react';
import Tooltip from '../components/Tooltip';

function Contact() {
  // useState 1: Controlled Form Input States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // useState 2: Tooltip / Element Visibility Toggle State
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  // useState 3: Form submission feedback state
  const [submitted, setSubmitted] = useState(false);

  const MAX_CHARS = 200;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', margin: 0 }}>
            <Mail size={32} /> Contact & Live State Form
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Demonstrating controlled inputs, live character limits, and element visibility toggles using <code>useState</code>.
          </p>
        </div>

        {/* Toggle UI Visibility Button */}
        <button 
          onClick={() => setShowHelpTooltip(!showHelpTooltip)}
          className="btn btn-secondary"
          style={{ gap: '0.5rem' }}
        >
          <HelpCircle size={18} color="var(--accent-primary)" />
          {showHelpTooltip ? 'Hide Explanation' : 'How useState Works?'}
        </button>
      </div>

      {/* Tooltip component toggled via useState */}
      <Tooltip 
        isVisible={showHelpTooltip} 
        onClose={() => setShowHelpTooltip(false)} 
      />

      <div className="contact-container">
        {/* Controlled Form */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} color="var(--accent-primary)" /> Controlled Contact Form
          </h3>

          {submitted ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--success)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <CheckCircle size={40} color="var(--success)" style={{ margin: '0 auto 0.5rem' }} />
              <h4 style={{ color: 'var(--success)' }}>Message Sent Successfully!</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Thank you <strong>{formData.name}</strong>. Your message was processed statefully in React!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name *</label>
                <input 
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input 
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea 
                  id="contact-message"
                  name="message"
                  className="form-control"
                  placeholder="Type your message here..."
                  maxLength={MAX_CHARS}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {/* Live Character Count Requirement */}
                <div className={`char-counter ${formData.message.length >= MAX_CHARS * 0.9 ? 'warning' : ''}`}>
                  Live Character Count: {formData.message.length} / {MAX_CHARS}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Real-time Input Display Box (PDF Requirement: captures and displays user input in real time) */}
        <div className="live-preview-box">
          <span className="preview-badge">
            <Eye size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Real-Time State Monitor
          </span>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Live State Data</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>NAME STATE:</span>
              <strong style={{ color: formData.name ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {formData.name || 'Waiting for input...'}
              </strong>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>EMAIL STATE:</span>
              <strong style={{ color: formData.email ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {formData.email || 'Waiting for input...'}
              </strong>
            </div>

            <div style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>MESSAGE STATE:</span>
              <p style={{ color: formData.message ? 'var(--text-primary)' : 'var(--text-muted)', fontStyle: formData.message ? 'normal' : 'italic', wordBreak: 'break-word', marginTop: '0.25rem' }}>
                {formData.message || 'No message entered yet...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
