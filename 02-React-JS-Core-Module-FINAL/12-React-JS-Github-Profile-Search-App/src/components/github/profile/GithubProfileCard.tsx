import React from "react";
import type { IProfile } from "../models/IProfile";

interface IProps {
  profile: IProfile;
}

const GithubProfileCard: React.FC<IProps> = ({ profile }) => {
  return (
    <div className="card">
      <img src={profile.avatar_url} alt="" className="img-fluid" />

      <div className="card-body">
        <p className="h4">{profile.name}</p>
        <small>{profile.bio}</small>
        <br />

        <a
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success btn-sm mt-2"
        >
          Profile
        </a>
      </div>
    </div>
  );
};

export default GithubProfileCard;
