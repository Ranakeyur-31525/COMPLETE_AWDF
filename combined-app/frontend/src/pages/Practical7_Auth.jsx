import React, { useState } from 'react';
import { Lock, Shield, Key, UserCheck, AlertCircle } from 'lucide-react';

export default function Practical7_Auth({ onToast }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('d25dce176@charusat.edu.in');
  const [password, setPassword] = useState('Password123');
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const simulateLogin = () => {
    if (password.length < 6) {
      onToast('Validation error: Password must be at least 6 characters', 'error');
      addLog('Validation rejected: Password too short');
      return;
    }
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTY...';
    setToken(dummyToken);
    const u = { name: 'Keyur Rana', email, role: 'student', id: 'D25DCE176' };
    setUser(u);
    onToast('Logged in successfully! JWT token generated.', 'success');
    addLog(`Signed JWT token issued for user ${email}`);
  };

  const simulateMeEndpoint = () => {
    if (!token) {
      onToast('401 Unauthorized: Bearer token missing!', 'error');
      addLog('GET /api/auth/me -> 401 Unauthorized');
      return;
    }
    onToast(`Authenticated as ${user.name} (${user.id})`, 'info');
    addLog(`GET /api/auth/me -> 200 OK (User authenticated: ${user.name})`);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    onToast('Logged out. Token discarded.', 'info');
    addLog('Client token purged from session memory');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#4f46e5', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Lock size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 7: JWT Authentication & Middleware Pipeline</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              Bcrypt Hashing • JWT Token Signature • Input Validation Middleware • Protected /api/tasks Routes
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 18, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Key size={16} /> Authentication Simulator
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button
                  onClick={simulateLogin}
                  style={{ flex: 1, padding: '9px 12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  Sign In / Get JWT
                </button>
                {token && (
                  <button
                    onClick={handleLogout}
                    style={{ padding: '9px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                )}
              </div>
              <button
                onClick={simulateMeEndpoint}
                style={{ padding: '8px 12px', background: '#e0e7ff', color: '#3730a3', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
              >
                Test Protected GET /api/auth/me
              </button>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 18, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} /> Active Token State
            </h4>
            {token ? (
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                  ✔ Authenticated: {user?.name}
                </p>
                <div style={{ background: '#1e1e1e', color: '#4ec9b0', padding: 10, borderRadius: 6, fontSize: 11, wordBreak: 'break-all', fontFamily: 'monospace' }}>
                  {token}
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
                No active token. Protected routes will respond with <code>401 Unauthorized</code>.
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ background: '#1e293b', color: '#f8fafc', borderRadius: 12, padding: 18, fontFamily: 'monospace', fontSize: 12 }}>
        <div style={{ fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Middleware Pipeline Event Log:</div>
        {logs.length === 0 ? <div>No events recorded yet. Perform an action above.</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
