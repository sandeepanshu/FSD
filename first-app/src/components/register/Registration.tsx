import React, { useState } from "react";
import type { IUser } from "./IUser";

interface IProps {}
interface IState {
  user: IUser;
}

const Registration: React.FC<IProps> = () => {
  const [userState, setUserState] = useState<IState>({
    user: {
      username: "",
      email: "",
      password: "",
      designation: "",
      bio: "",
      terms: false,
    },
  });

  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUserState({
      user: {
        ...userState.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  const updateTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      user: {
        ...userState.user,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userState.user); // POST
  };

  const { user } = userState;
  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(userState.user)}</pre>*/}
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <p className="h3">Registration</p>
                </div>
                <div className="card-body bg-light">
                  <form onSubmit={submitRegister}>
                    <div className="form-group mb-2">
                      <input
                        name="username"
                        value={user.username}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        name="email"
                        value={user.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        name="password"
                        value={user.password}
                        onChange={updateInput}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <select
                        name="designation"
                        value={user.designation}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Select Designation</option>
                        <option value="Software Engineer">
                          Software Engineer
                        </option>
                        <option value="Sr.Software Engineer">
                          Sr.Software Engineer
                        </option>
                        <option value="Tech Lead">Tech Lead</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <textarea
                        name="bio"
                        value={user.bio}
                        onChange={updateInput}
                        rows={4}
                        className="form-control"
                        placeholder="Bio"
                      />
                    </div>
                    <div className="form-check mb-2">
                      <input
                        name="terms"
                        onChange={updateTerms}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Accept Terms</label>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="submit"
                        className="btn btn-secondary btn-sm"
                        value="Register"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Registration;
