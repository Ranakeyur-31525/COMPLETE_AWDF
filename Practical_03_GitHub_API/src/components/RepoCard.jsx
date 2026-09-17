import React from 'react';
import { Star, GitFork, ExternalLink, Book } from 'lucide-react';

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8'
};

function RepoCard({ repo }) {
  const languageColor = langColors[repo.language] || '#8b949e';

  return (
    <div className="repo-card">
      <div>
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noreferrer" 
          className="repo-name"
        >
          <Book size={18} color="var(--accent-primary)" />
          {repo.name}
          <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.7 }} />
        </a>

        <p className="repo-desc">
          {repo.description || "No description provided for this GitHub repository."}
        </p>
      </div>

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-lang">
            <span className="lang-dot" style={{ backgroundColor: languageColor }}></span>
            {repo.language}
          </span>
        )}

        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Star size={14} color="var(--warning)" />
          {repo.stargazers_count}
        </span>

        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <GitFork size={14} />
          {repo.forks_count}
        </span>
      </div>
    </div>
  );
}

export default RepoCard;
