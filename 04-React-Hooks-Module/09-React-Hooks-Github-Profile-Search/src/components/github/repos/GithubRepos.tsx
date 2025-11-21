import React from "react";
import type { IRepository } from "../models/IRepository";

interface IProps {
  repos: IRepository[];
}

const GithubRepos: React.FC<IProps> = ({ repos }) => {
  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Your Repositories</h5>
        </div>

        <ul className="list-group list-group-flush">
          {repos.map((repo) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={repo.id}
            >
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="fw-bold text-primary text-decoration-none"
                >
                  {repo.name}
                </a>

                {repo.description && (
                  <p className="small text-muted mb-0">{repo.description}</p>
                )}
              </div>

              <div className="text-end">
                <span className="badge bg-warning text-dark me-1">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="badge bg-info text-dark">
                  👀 {repo.watchers_count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GithubRepos;
