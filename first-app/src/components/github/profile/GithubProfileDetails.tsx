import React from "react";
import type { IProfile } from "../models/IProfile";

interface IProps {
  profile: IProfile;
}

const ProfileDetails: React.FC<IProps> = ({ profile }) => {
  return (
    <div className="card">
      <div className="card-header bg-light">
        <span className="badge bg-success mx-2">
          {profile.followers} Followers
        </span>
        <span className="badge bg-warning mx-2">
          {profile.public_repos} Repos
        </span>
        <span className="badge bg-secondary mx-2">
          {profile.public_gists} Gists
        </span>
        <span className="badge bg-danger mx-2">
          {profile.following} Following
        </span>
      </div>

      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            NAME :<span className="fw-bold"> {profile.name}</span>
          </li>

          <li className="list-group-item">
            Location : <span>{profile.location}</span>
          </li>

          <li className="list-group-item">
            Email : <span>{profile.email}</span>
          </li>

          <li className="list-group-item">
            Company : <span>{profile.company}</span>
          </li>

          <li className="list-group-item">
            Blog :
            <a href={profile.blog} target="_blank" rel="noreferrer">
              Visit Blog
            </a>
          </li>

          <li className="list-group-item">
            Member Since :
            <span>
              {new Date(profile.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </li>

          <li className="list-group-item">
            Profile URL :
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              {profile.html_url}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;
