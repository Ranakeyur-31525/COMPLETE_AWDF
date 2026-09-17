import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Search, 
  Star, 
  GitFork, 
  ExternalLink, 
  AlertTriangle, 
  RefreshCw, 
  Loader2, 
  Code2, 
  User 
} from 'lucide-react';
import { fetchGitHubUser, fetchGitHubRepos } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function Practical3_GitHub({ onToast }) {
  const [username, setUsername] = useState('Ranakeyur-31525');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);

  // Load repositories & user profile
  const loadGitHubData = async (targetUser = username, simulate = simulateError) => {
    setLoading(true);
    setError(null);
    try {
      const [profileData, reposData] = await Promise.all([
        fetchGitHubUser(targetUser),
        fetchGitHubRepos(targetUser, simulate)
      ]);
      setUserProfile(profileData);
      setRepos(reposData);
      if (onToast) onToast(`Loaded ${reposData.length} repositories from GitHub.`, 'success');
    } catch (err) {
      console.error('GitHub fetch failed:', err);
      setError(err.message || 'Failed to fetch repositories');
      if (onToast) onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGitHubData(username, simulateError);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    loadGitHubData(username.trim(), simulateError);
  };

  const handleSimulateToggle = () => {
    const nextSimulate = !simulateError;
    setSimulateError(nextSimulate);
    loadGitHubData(username, nextSimulate);
  };

  // Filter repositories by search query
  const filteredRepos = repos.filter((r) => {
    const term = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      (r.description && r.description.toLowerCase().includes(term)) ||
      (r.language && r.language.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            PRACTICAL 03
          </span>
          <StatusBadge label="GitHub REST API v3 Integration" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          GitHub API Integration & Repository Explorer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
          Asynchronous data fetching with <code>useEffect</code> & <code>fetch()</code>, dynamic search filtering, loading states, and error simulation.
        </p>
      </div>

      {/* Control Bar: User Lookup & Error Simulator */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="Enter GitHub username (e.g. Ranakeyur-31525)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Search size={16} />
              <span>Fetch</span>
            </button>
          </form>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              className={`btn ${simulateError ? 'btn-danger' : 'btn-secondary'} btn-sm`}
              onClick={handleSimulateToggle}
              title="Demonstrate error handling for lab evaluation / viva"
            >
              <AlertTriangle size={14} />
              <span>{simulateError ? 'Error Active (Simulated)' : 'Simulate API Error'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => loadGitHubData(username, simulateError)}
              title="Reload data"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Reload</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Header (if loaded) */}
      {userProfile && !error && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <img
            src={userProfile.avatar_url}
            alt={userProfile.login}
            style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--border-focus)' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{userProfile.name || userProfile.login}</h2>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>@{userProfile.login}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {userProfile.bio || 'GitHub Developer'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{userProfile.public_repos}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Repositories</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{userProfile.followers}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Followers</div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Repos Search Bar */}
      <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        <input
          type="text"
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
          placeholder="Filter fetched repositories by name, language, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Loader2 size={32} className="animate-spin" color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Fetching Live Data from GitHub API...</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            Sending asynchronous HTTP request via fetch() inside useEffect()
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="glass-card" style={{ borderColor: 'rgba(244, 63, 94, 0.4)', background: 'rgba(244, 63, 94, 0.05)', padding: '2rem', textAlign: 'center' }}>
          <AlertTriangle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 0.75rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
            Error Consuming GitHub API
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
            {error}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSimulateError(false);
              loadGitHubData(username, false);
            }}
          >
            <RefreshCw size={14} />
            <span>Retry Fetch (Disable Simulated Error)</span>
          </button>
        </div>
      )}

      {/* Repositories Grid */}
      {!loading && !error && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredRepos.length}</strong> of <strong>{repos.length}</strong> repositories
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, wordBreak: 'break-word' }}>
                    {repo.name}
                  </h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem' }}
                    title="View on GitHub"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1, lineHeight: 1.5 }}>
                  {repo.description || 'No description provided.'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Code2 size={14} color="var(--accent-cyan)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{repo.language || 'Plain Text'}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={13} color="var(--accent-amber)" />
                      {repo.stargazers_count}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <GitFork size={13} />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
