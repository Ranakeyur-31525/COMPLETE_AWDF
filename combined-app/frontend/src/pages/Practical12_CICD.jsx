import React, { useState } from 'react';
import { GitBranch, CheckCircle2, XCircle, Play, ShieldAlert } from 'lucide-react';

export default function Practical12_CICD({ onToast }) {
  const [pipelineState, setPipelineState] = useState('passed'); // 'passed' or 'failed'
  const [running, setRunning] = useState(false);

  const runPipeline = (mode) => {
    setRunning(true);
    setTimeout(() => {
      setPipelineState(mode);
      setRunning(false);
      if (mode === 'passed') {
        onToast('Pipeline Passed! All 5 test assertions succeeded.', 'success');
      } else {
        onToast('Pipeline Failed! Broken test halted the build.', 'error');
      }
    }, 800);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#059669', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <GitBranch size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 12: CI/CD Pipeline with GitHub Actions</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              Automated Push Triggers • Dependency Caching • Jest/Supertest Assertions • Failure Diagnostic Logs
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => runPipeline('passed')}
            disabled={running}
            style={{ padding: '10px 18px', background: '#059669', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Play size={16} /> Run Passing Pipeline
          </button>
          <button
            onClick={() => runPipeline('failed')}
            disabled={running}
            style={{ padding: '10px 18px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <ShieldAlert size={16} /> Demonstrate Deliberately Broken Pipeline
          </button>
        </div>

        {/* GitHub Actions Pipeline Visualizer */}
        <div style={{ background: '#0d1117', color: '#c9d1d9', padding: 20, borderRadius: 12, border: '1px solid #30363d', fontFamily: 'monospace', fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #21262d', paddingBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {pipelineState === 'passed' ? <CheckCircle2 size={18} color="#238636" /> : <XCircle size={18} color="#da3633" />}
              <span style={{ fontWeight: 600 }}>Workflow: AWDF Full-Stack CI/CD Pipeline</span>
            </div>
            <span style={{ fontSize: 11, background: pipelineState === 'passed' ? '#238636' : '#da3633', color: '#fff', padding: '2px 8px', borderRadius: 12 }}>
              {pipelineState === 'passed' ? 'Passing' : 'Failed'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3fb950' }}>
              <CheckCircle2 size={15} /> 1. Set up job (ubuntu-latest, Node 18.x)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3fb950' }}>
              <CheckCircle2 size={15} /> 2. Checkout code (actions/checkout@v4)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3fb950' }}>
              <CheckCircle2 size={15} /> 3. Install dependencies (npm ci)
            </div>
            {pipelineState === 'passed' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3fb950' }}>
                <CheckCircle2 size={15} /> 4. Run automated test suite (5/5 assertions passed)
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f85149' }}>
                <XCircle size={15} /> 4. Run automated test suite: AssertionError: Priority 'critical' not in schema
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: pipelineState === 'passed' ? '#3fb950' : '#8b949e' }}>
              {pipelineState === 'passed' ? <CheckCircle2 size={15} /> : <XCircle size={15} />} 5. Post Run Status & Reporting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
