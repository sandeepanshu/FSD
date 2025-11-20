import React from "react";
import type { IRepository } from "../models/IRepository";

interface IProps {
  repos: IRepository[];
}

const GithubRepos: React.FC<IProps> = ({ repos }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="h4">Your Repositories</p>
      </div>

      <div className="card-body">
        <ul className="list-group">
          {repos.map((repo) => (
            <li className="list-group-item" key={repo.id}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0">
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </span>

                <div className="d-flex align-items-center">
                  <span className="badge bg-success">
                    ⭐ {repo.stargazers_count} Stars
                  </span>

                  <span className="badge bg-warning text-dark ms-2">
                    👁 {repo.watchers_count} Watchers
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GithubRepos;
