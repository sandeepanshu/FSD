import React from "react";
import type { IProfile } from "../models/IProfile";

interface IProps {
  profile: IProfile | null; // allow null safely
}

const GithubProfileCard: React.FC<IProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="card p-3 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <img
          src={profile.avatar_url || "https://via.placeholder.com/300"}
          alt={profile.name || "Github User"}
          className="img-fluid"
        />
        <div className="card-body">
          <p className="h4">{profile.name || "No Name Available"}</p>

          {profile.bio && <small>{profile.bio}</small>}
          {!profile.bio && <small>No Bio Provided</small>}

          <br />

          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-success btn-sm mt-2"
          >
            View Profile
          </a>
        </div>
      </div>
    </>
  );
};

export default GithubProfileCard;
