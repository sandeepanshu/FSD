import { useState } from "react";
import axios from "axios";

import { GithubCred } from "./credentials/GithubCred";
import type { IProfile } from "./models/IProfile";
import type { IRepository } from "./models/IRepository";

import GithubProfile from "./profile/GithubProfile";
import GithubRepos from "./repos/GithubRepos";

const GithubProfileSearchApp: React.FC = () => {
  const [githubUserName, setGithubUserName] = useState<string>("");
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  const [repos, setRepos] = useState<IRepository[]>([]);

  // Handle input
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUserName(event.target.value);
  };

  // Form submit
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!githubUserName.trim()) return;

    searchProfile(githubUserName);
    searchRepos(githubUserName);
  };

  // Fetch Profile
  const searchProfile = (githubUser: string) => {
    const dataURL = `https://api.github.com/users/${githubUser}?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.Client_Secret}`;

    axios
      .get<IProfile>(dataURL)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  };

  // Fetch Repos
  const searchRepos = (githubUser: string) => {
    const dataURL = `https://api.github.com/users/${githubUser}/repos?Client_ID=${GithubCred.Client_ID}&Client_Secret=${GithubCred.Client_Secret}`;

    axios
      .get<IRepository[]>(dataURL)
      .then((res) => setRepos(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Github Search App</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloremque dolorum minus obcaecati odio porro quae vero voluptas
                voluptatem.
              </p>
            </div>
          </div>

          {/* SEARCH FORM */}
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitSearch}>
                <div className="row no-gutters">
                  <div className="col">
                    <div className="form-group">
                      <input
                        value={githubUserName}
                        onChange={changeInput}
                        type="text"
                        className="form-control"
                        placeholder="Github Username"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="submit"
                      className="btn btn-primary btn"
                      value="Search"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE SECTION */}
      <section className="mt-3">
        <div className="container">
          {Object.keys(profile).length > 0 && (
            <GithubProfile profile={profile} />
          )}
        </div>
      </section>

      {/* REPOS SECTION */}
      <section className="mt-3">
        <div className="container">
          {repos.length > 0 && <GithubRepos repos={repos} />}
        </div>
      </section>
    </>
  );
};

export default GithubProfileSearchApp;
