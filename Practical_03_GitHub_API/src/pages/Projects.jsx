import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, AlertTriangle, Github, CheckCircle2, Filter } from 'lucide-react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('Ranakeyur-31525');
  const [simulateError, setSimulateError] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  const fetchRepositories = async (isBrokenUrl = false) => {
    setLoading(true);
    setError(null);

    // API URL - Uses invalid URL if simulateError is toggled for testing error states
    const targetUrl = isBrokenUrl 
      ? 'https://api.github.com/invalid-endpoint-for-error-testing-12345'
      : `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`;

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Failed to fetch repositories for '${username}'. User may not exist or rate limit exceeded.`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('API returned unexpected response format.');
      }
      setRepos(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while connecting to the REST API.');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect triggers fetch on mount and when username or error simulation changes
  useEffect(() => {
    fetchRepositories(simulateError);
  }, [username, simulateError, fetchCount]);

  const handleRetry = () => {
    setSimulateError(false);
    setFetchCount(prev => prev + 1);
  };

  const handleToggleSimulateError = () => {
    const nextState = !simulateError;
    setSimulateError(nextState);
    fetchRepositories(nextState);
  };

  // Filter repositories based on search term
  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge">Practical 3: REST API Integration</span>
          <span className="badge" style={{ background: 'rgba(35, 134, 54, 0.15)', color: 'var(--success)', borderColor: 'rgba(57, 211, 83, 0.3)' }}>
            <CheckCircle2 size={13} /> GitHub API REST v3
          </span>
        </div>

        <h1 className="page-title">
          <Github size={32} color="var(--accent-primary)" /> GitHub Repositories Explorer
        </h1>
        <p className="page-description">
          Fetching dynamic repository data from GitHub REST API with <code>useEffect()</code> lifecycle hooks, <code>useState</code> loading/error handling, and real-time search filtering.
        </p>
      </div>

      {/* Controls Bar: Search Input + Error Simulator Toggle */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text"
            className="search-input"
            placeholder="Search repositories by name, language, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            onClick={() => setFetchCount(prev => prev + 1)} 
            className="btn btn-secondary"
            title="Re-trigger API fetch"
          >
            <RefreshCw size={16} /> Refresh Data
          </button>

          {/* Test Error Path Button (Demonstrates Error Handling for Practical 3 Viva Evaluation) */}
          <button 
            onClick={handleToggleSimulateError} 
            className={`btn ${simulateError ? 'btn-primary' : 'btn-danger'}`}
            title="Toggle invalid API URL to test error handling"
          >
            <AlertTriangle size={16} /> 
            {simulateError ? 'Restore Valid API' : 'Simulate API Error'}
          </button>
        </div>
      </div>

      {/* Conditional Rendering Based on Asynchronous API State */}
      {loading ? (
        <Spinner message={`Fetching public repositories for user '${username}'...`} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>
              Showing <strong>{filteredRepos.length}</strong> of <strong>{repos.length}</strong> repositories
            </span>
            {searchTerm && (
              <span style={{ color: 'var(--accent-primary)' }}>
                Filter: "{searchTerm}"
              </span>
            )}
          </div>

          <RepoList repos={filteredRepos} />
        </div>
      )}
    </div>
  );
}

export default Projects;
