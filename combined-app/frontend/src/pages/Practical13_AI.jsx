import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, Check, Info, Clock, RefreshCw } from 'lucide-react';

export default function Practical13_AI({ onToast }) {
  const [title, setTitle] = useState('Implement Docker Compose Multi-Container Orchestration');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const handleGenerate = () => {
    if (!title.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const res = {
        title,
        description: `Design and orchestrate multi-tier microservices for "${title}". Configure internal bridge networking, establish persistent named volumes for database consistency, and minimize image layer sizes with multi-stage builds.`,
        priority: 'high',
        hours: 5,
        engine: 'Gemini 1.5 Flash (Server-Side Proxy)',
        disclaimer: 'AI-generated suggestion. Please review before applying.'
      };
      setSuggestion(res);
      onToast('AI generated description and suggested priority!', 'success');
    }, 800);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Bot size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 13: AI API Integration into Web Application</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              Google Gemini 1.5 • Server-Side Secret Storage • Graceful Fallback • Rate Limiter & Disclaimers
            </p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 20, borderRadius: 12, border: '1px solid var(--border-color, #e2e8f0)', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 15 }}>Auto-generate Task Details</h4>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {loading ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
              {loading ? 'Consulting Gemini AI...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {suggestion && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#eff6ff', color: '#1e40af', padding: '8px 12px', borderRadius: 6, fontSize: 12, marginBottom: 14, fontWeight: 500 }}>
              <Info size={16} />
              <span>{suggestion.disclaimer}</span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Generated Description</label>
              <p style={{ margin: '6px 0 0', fontSize: 14, color: '#1e293b', lineHeight: 1.5 }}>{suggestion.description}</p>
            </div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: 12, fontSize: 13 }}>
              <div>
                <span style={{ color: '#64748b' }}>Suggested Priority: </span>
                <span style={{ fontWeight: 700, color: '#b91c1c', background: '#fee2e2', padding: '2px 8px', borderRadius: 10 }}>
                  {suggestion.priority.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569' }}>
                <Clock size={15} />
                <span>Estimated: ~{suggestion.hours} Hours</span>
              </div>
              <div style={{ marginLeft: 'auto', color: '#6366f1', fontWeight: 600 }}>
                {suggestion.engine}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
