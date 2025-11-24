import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { IUser } from "./IUser";
import { registerUser } from "../../redux/register/register.slice";

const Registration: React.FC = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    designation: "",
    bio: "",
    terms: false,
  });

  // Generic handler for text, email, password, select, textarea
  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Separate handler for checkbox
  const updateTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      terms: event.target.checked,
    }));
  };

  const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(
      "Registering User:", user
    )
    event.preventDefault();
    dispatch(registerUser(user)); // RTK Action
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <p className="h3 mb-0">Registration</p>
              </div>

              <div className="card-body bg-light">
                <form onSubmit={submitRegister}>
                  {/* Username */}
                  <div className="mb-2">
                    <input
                      name="username"
                      value={user.username}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-2">
                    <input
                      name="email"
                      value={user.email}
                      onChange={updateInput}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-2">
                    <input
                      name="password"
                      value={user.password}
                      onChange={updateInput}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  {/* Designation */}
                  <div className="mb-2">
                    <select
                      name="designation"
                      value={user.designation}
                      onChange={updateInput}
                      className="form-control"
                      required
                    >
                      <option value="">Select Designation</option>
                      <option value="Software Engineer">
                        Software Engineer
                      </option>
                      <option value="Sr.Software Engineer">
                        Sr. Software Engineer
                      </option>
                      <option value="Tech Lead">Tech Lead</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  {/* Bio */}
                  <div className="mb-2">
                    <textarea
                      name="bio"
                      value={user.bio}
                      onChange={updateInput}
                      rows={4}
                      className="form-control"
                      placeholder="Bio"
                      required
                    />
                  </div>

                  {/* Terms */}
                  <div className="form-check mb-3">
                    <input
                      name="terms"
                      checked={user.terms}
                      onChange={updateTerms}
                      type="checkbox"
                      className="form-check-input"
                      id="termsCheck"
                    />
                    <label className="form-check-label" htmlFor="termsCheck">
                      Accept Terms
                    </label>
                  </div>

                  {/* Submit */}
                  <button className="btn btn-secondary btn-sm w-100">
                    Register
                  </button>
                </form>
              </div>
            </div>

            {/* Debug */}
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
