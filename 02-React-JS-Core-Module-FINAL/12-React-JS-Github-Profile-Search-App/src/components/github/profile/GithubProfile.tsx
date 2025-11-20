import React from "react";
import type { IProfile } from "../models/IProfile";
import GithubProfileCard from "./GithubProfileCard";
import GithubProfileDetails from "./GithubProfileDetails";

interface IProps {
  profile: IProfile;
}

const GithubProfile: React.FC<IProps> = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <GithubProfileCard profile={profile} />
      </div>

      <div className="col-md-9">
        <GithubProfileDetails profile={profile} />
      </div>
    </div>
  );
};

export default GithubProfile;
