import React, { useState } from "react";
import type { IUser } from "./IUser";

const Registration: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    bio: "",
    designation: "",
    terms: false,
  });

  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: checked,
    }));
  };

  const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page refresh
    console.log(user);
  };

  return (
    <>
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
                        type="checkbox"
                        className="form-check-input"
                        checked={user.terms}
                        onChange={updateCheck}
                      />
                      <label className="form-check-label">Accept Terms</label>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary btn-sm"
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
    </>
  );
};

export default Registration;
