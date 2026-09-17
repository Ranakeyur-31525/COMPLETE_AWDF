import React from 'react';
import RepoCard from './RepoCard';
import { SearchX } from 'lucide-react';

function RepoList({ repos = [] }) {
  if (repos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', border: '1px border-color var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <SearchX size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No matching repositories found</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Try searching with a different keyword or clear the search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {repos.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export default RepoList;
