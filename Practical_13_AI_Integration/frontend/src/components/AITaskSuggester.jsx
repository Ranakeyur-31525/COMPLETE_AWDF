import React, { useState } from 'react';
import { Sparkles, Bot, Clock, AlertTriangle, Check, RefreshCw, Info } from 'lucide-react';

export default function AITaskSuggester({ onApplySuggestion }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5004/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });

      const data = await res.json();

      if (res.status === 429) {
        setError(data.error);
        setCooldown(data.retryAfter || 60);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate AI description');
      }

      setSuggestion(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: 8, borderRadius: 8, color: '#fff', display: 'flex' }}>
          <Sparkles size={20} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 17, color: '#1e293b' }}>AI Task Description & Priority Generator</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Powered by Google Gemini 1.5 with server-side key security</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter a task title (e.g. Set up Docker containerization with Compose)..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          style={{
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)'
          }}
        >
          {loading ? (
            <>
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate with AI</span>
            </>
          )}
        </button>
      </form>

      {/* Error / Rate Limit Notice (Supplementary Problem 2) */}
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* AI Generated Suggestion Card */}
      {suggestion && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginTop: 10 }}>
          {/* Disclaimer Banner (Supplementary Problem 3) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '8px 12px', borderRadius: 6, fontSize: 12, marginBottom: 14, fontWeight: 500 }}>
            <Info size={16} />
            <span>{suggestion.disclaimer}</span>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Generated Description
            </label>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#1e293b', lineHeight: 1.5 }}>
              {suggestion.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 16, paddingTop: 10, borderTop: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: 12, color: '#64748b' }}>Suggested Priority: </span>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 12, padding: '2px 8px', borderRadius: 10, background: suggestion.suggestedPriority === 'high' ? '#fee2e2' : suggestion.suggestedPriority === 'medium' ? '#fef3c7' : '#e0f2fe', color: suggestion.suggestedPriority === 'high' ? '#b91c1c' : suggestion.suggestedPriority === 'medium' ? '#b45309' : '#0369a1' }}>
                {suggestion.suggestedPriority}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' }}>
              <Clock size={15} />
              <span>Est. Effort: ~{suggestion.estimatedHours} Hours</span>
            </div>

            <div style={{ fontSize: 12, color: '#64748b', marginLeft: 'auto' }}>
              Engine: <strong style={{ color: '#4f46e5' }}>{suggestion.aiProvider}</strong>
            </div>
          </div>

          {onApplySuggestion && (
            <button
              type="button"
              onClick={() => onApplySuggestion(suggestion)}
              style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
            >
              <Check size={16} /> Accept & Populate Task Form
            </button>
          )}
        </div>
      )}
    </div>
  );
}
