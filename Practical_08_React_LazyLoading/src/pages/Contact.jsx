import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ fontSize: 22, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Mail size={22} color="#4f46e5" /> Contact Route (Lazy Chunk)
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>
        Chunk fetched dynamically only when navigating to <code>/contact</code>.
      </p>

      {submitted ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: 24, borderRadius: 12, textAlign: 'center' }}>
          <Check size={32} style={{ margin: '0 auto 10px' }} />
          <h3 style={{ margin: '0 0 6px' }}>Thank you!</h3>
          <p style={{ margin: 0, fontSize: 14 }}>Your message has been recorded.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: 24, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Your Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Message</label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
          <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Send size={16} /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
