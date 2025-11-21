import React from "react";
import type { IProfile } from "../models/IProfile";

interface IProps {
  profile: IProfile | null;
}
const GithubProfileDetails: React.FC<IProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="card p-4 text-center shadow-sm">
        <p>Loading profile details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="card-header py-3 border-0">
          <span className="badge bg-success me-2">
            {profile.followers} Followers
          </span>
          <span className="badge bg-primary me-2">
            {profile.public_repos} Repos
          </span>
          <span className="badge bg-secondary me-2">
            {profile.public_gists} Gists
          </span>
          <span className="badge bg-danger me-2">
            {profile.following} Following
          </span>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Name:</strong> {profile.name || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Location:</strong> {profile.location || "Unknown"}
            </li>

            <li className="list-group-item">
              <strong>Email:</strong> {profile.email || "Not Provided"}
            </li>

            <li className="list-group-item">
              <strong>Company:</strong> {profile.company || "N/A"}
            </li>

            <li className="list-group-item">
              <strong>Blog:</strong>
              {profile.blog ? (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none fw-semibold"
                >
                  Visit Blog
                </a>
              ) : (
                "Not Available"
              )}
            </li>
            <li className="list-group-item">
              <strong>Member Since:</strong>
              {new Date(profile.created_at).toDateString()}
            </li>
            <li className="list-group-item">
              <strong>Profile URL:</strong>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary fw-semibold text-break"
              >
                {profile.html_url}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GithubProfileDetails;
