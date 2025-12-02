import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ADD_EXPERIENCE,
  type AddExperiencePayload,
} from "../../../redux/profiles/profile.types";

const AddExperience: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  // -------------------------
  // Text Inputs
  // -------------------------
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExperience({
      ...experience,
      [event.target.name]: event.target.value,
    });
  };

  // -------------------------
  // Checkbox
  // -------------------------
  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperience({
      ...experience,
      [event.target.name]: event.target.checked,
      ...(event.target.name === "current" && event.target.checked
        ? { to: "" }
        : {}),
    });
  };

  // -------------------------
  // Submit Form
  // -------------------------
  const submitAddExperience = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: AddExperiencePayload = {
      experience,
      navigate,
    };

    dispatch({ type: ADD_EXPERIENCE, payload });
  };

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <p className="h3 text-teal">
            <i className="fa fa-user-clock" /> Add Experience
          </p>
          <p>
            Add your professional experience including company, title, and work
            duration.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={submitAddExperience}>
                {/* Title */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Title
                  </span>
                  <input
                    required
                    name="title"
                    value={experience.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>

                {/* Company */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Company
                  </span>
                  <input
                    required
                    name="company"
                    value={experience.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>

                {/* Location */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Location
                  </span>
                  <input
                    required
                    name="location"
                    value={experience.location}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />
                </div>

                {/* From Date */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    From
                  </span>
                  <input
                    required
                    name="from"
                    value={experience.from}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                  />
                </div>

                {/* Current Checkbox */}
                <div className="form-check mb-3">
                  <input
                    name="current"
                    checked={experience.current}
                    onChange={updateCheck}
                    className="form-check-input"
                    type="checkbox"
                    id="currentCheck"
                  />
                  <label className="form-check-label" htmlFor="currentCheck">
                    Current
                  </label>
                </div>

                {/* To Date */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    To
                  </span>
                  <input
                    name="to"
                    value={experience.to}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                    disabled={experience.current}
                  />
                </div>

                {/* Description */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Description
                  </span>
                  <textarea
                    required
                    name="description"
                    value={experience.description}
                    onChange={updateInput}
                    rows={3}
                    className="form-control"
                    placeholder="Description"
                  />
                </div>

                {/* Buttons */}
                <div>
                  <input
                    type="submit"
                    value="Add Experience"
                    className="btn btn-teal btn-sm"
                  />
                  <Link
                    to="/profiles/dashboard"
                    className="btn bg-light-grey btn-sm ml-2"
                  >
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddExperience;
