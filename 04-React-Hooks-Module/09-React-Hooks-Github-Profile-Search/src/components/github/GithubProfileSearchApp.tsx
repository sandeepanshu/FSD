import React, { useState } from "react";
import type { IProfile } from "./models/IProfile";
import type { IRepository } from "./models/IRepository";
import axios from "axios";
import GithubProfile from "./profile/GithubProfile";
import GithubRepos from "./repos/GithubRepos";

interface IState {
  githubUserName: string;
  profile: IProfile | null;
  repos: IRepository[];
}

const GithubProfileSearchApp: React.FC = () => {
  const [githubState, setGithubState] = useState<IState>({
    githubUserName: "",
    profile: null,
    repos: [],
  });

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubState((prev) => ({
      ...prev,
      githubUserName: event.target.value,
    }));
  };

  // Get Profile
  const searchProfile = async (username: string) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);

      setGithubState((prev) => ({
        ...prev,
        profile: res.data,
      }));
    } catch (err) {
      console.error("Profile Error:", err);
      setGithubState((prev) => ({ ...prev, profile: null }));
    }
  };

  // Get Repos
  const searchRepos = async (username: string) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      setGithubState((prev) => ({
        ...prev,
        repos: res.data,
      }));
    } catch (err) {
      console.error("Repo Error:", err);
      setGithubState((prev) => ({ ...prev, repos: [] }));
    }
  };

  // On Submit
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!githubState.githubUserName.trim()) return;

    searchProfile(githubState.githubUserName);
    searchRepos(githubState.githubUserName);
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Github Search App</p>
              <p>Enter a GitHub username to view profile & repositories.</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitSearch}>
                <div className="row no-gutters">
                  <div className="col">
                    <input
                      type="text"
                      value={githubState.githubUserName}
                      onChange={changeInput}
                      className="form-control"
                      placeholder="Github Username"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      {githubState.profile && (
        <section className="mt-3">
          <div className="container">
            <GithubProfile profile={githubState.profile} />
          </div>
        </section>
      )}

      {/* Repo Section */}
      {githubState.repos.length > 0 && (
        <section className="mt-3">
          <div className="container">
            <GithubRepos repos={githubState.repos} />
          </div>
        </section>
      )}
    </>
  );
};

export default GithubProfileSearchApp;
