import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Contributor, Repository } from '../types/repository';
import RepoApi from '../services/repo.api';
import { useAtom } from 'jotai';
import repositoriesAtom from '../services/repo.data';

const RepoPage = () => {
  const { username, repoName } = useParams();
  const [repositories] = useAtom(repositoriesAtom)
  const [repository, setRepository] = useState<Repository | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        if (!username || !repoName) return;
        const repo = repositories.filter(repo => repo.name === repoName)
        if(repo[0]) {
          const contri = await RepoApi.getContributors(username, repoName)
          setRepository(repo[0]);
          setContributors(contri)
        }
      } catch (error) {
        console.error('Error fetching repository:', error);
      }
    };

    fetchRepo();
  }, [repoName]);

  if (!repository) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="repo-page">
      <div className="repo-header">
        <h1 className="repo-name">{repository.name}</h1>
        <p className="repo-description">{repository.description || "No description available"}</p>
        
        <div className="repo-stats">
          <div className="stat-item">
            <i className="star-icon">⭐</i>
            <span>{repository.stargazers_count}</span>
          </div>
          {repository.language && (
            <div className="stat-item">
              <i className="language-icon">🔹</i>
              <span>{repository.language}</span>
            </div>
          )}
          <div className="stat-item">
            <i className="calendar-icon">📅</i>
            <span>Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
          </div>
        </div>

        <a 
          href={repository.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-link"
        >
          View on GitHub <span>→</span>
        </a>
      </div>

      <div className="contributors-section">
        <h2 className="section-title">Top Contributors</h2>
        <div className="contributors-grid">
          {contributors.map((contributor) => (
            <div key={contributor.login} className="contributor-card">
              <div className="avatar-wrapper">
                <img 
                  src={contributor.avatar_url} 
                  alt={`${contributor.login}'s avatar`}
                  className="contributor-avatar"
                />
              </div>
              <div className="contributor-info">
                <a 
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contributor-name"
                >
                  {contributor.login}
                </a>
                <span className="contributor-commits">
                  {contributor.contributions} commits
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
