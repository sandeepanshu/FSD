import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ADD_EDUCATION,
  type AddEducationPayload,
} from "../../../redux/profiles/profile.types";

const AddEducation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [education, setEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  // ----------------------------
  // Update Text Inputs
  // ----------------------------
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEducation({
      ...education,
      [event.target.name]: event.target.value,
    });
  };

  // ----------------------------
  // Update Checkbox
  // ----------------------------
  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEducation({
      ...education,
      [event.target.name]: event.target.checked,
      ...(event.target.name === "current" && event.target.checked
        ? { to: "" }
        : {}),
    });
  };

  // ----------------------------
  // Submit Form
  // ----------------------------
  const submitAddEducation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: AddEducationPayload = {
      education,
      navigate,
    };

    dispatch({ type: ADD_EDUCATION, payload });
  };

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <p className="h3 text-teal">
            <i className="fa fa-user-clock" /> Add Education
          </p>
          <p>
            Add your academic details including school, degree, and duration.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={submitAddEducation}>
                {/* School */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    School
                  </span>
                  <input
                    required
                    name="school"
                    value={education.school}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="School"
                  />
                </div>

                {/* Degree */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Degree
                  </span>
                  <input
                    required
                    name="degree"
                    value={education.degree}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Degree"
                  />
                </div>

                {/* Field Of Study */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-light-grey text-teal">
                    Field of Study
                  </span>
                  <input
                    required
                    name="fieldOfStudy"
                    value={education.fieldOfStudy}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Field Of Study"
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
                    value={education.from}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                  />
                </div>

                {/* Current Checkbox */}
                <div className="form-check mb-3">
                  <input
                    name="current"
                    checked={education.current}
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
                    value={education.to}
                    onChange={updateInput}
                    type="date"
                    className="form-control"
                    disabled={education.current}
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
                    value={education.description}
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
                    value="Add Education"
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

export default AddEducation;
