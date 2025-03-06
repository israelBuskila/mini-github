import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repository } from "../types/repository";

interface ReposListProps {
  repositories: Repository[];
}

const ReposList = ({ repositories }: ReposListProps) => {
  const navigate = useNavigate()

  const handleRepoClick = (repo: Repository) => {
    navigate(`/${repo.owner.login}/${repo.name}`);
  };

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id} onClick={() => handleRepoClick(repo)} style={{cursor: 'pointer'}}>
          <h3 className="repo-name">{repo.name}</h3>
          <p className="repo-description">{repo.description || "No description available"}</p>
          <div className="repo-stats">
            <span className="repo-stat">
              <i className="star-icon">⭐</i>
              {repo.stargazers_count}
            </span>
            {repo.language && (
              <span className="repo-stat">
                <i className="language-icon">🔹</i>
                {repo.language}
              </span>
            )}
          </div>
          <div className="repo-meta">
            <small>Created: {new Date(repo.created_at).toLocaleDateString()}</small>
            <small>Updated: {new Date(repo.updated_at).toLocaleDateString()}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReposList;
