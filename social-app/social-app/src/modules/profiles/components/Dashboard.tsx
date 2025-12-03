import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../layout/util/Spinner";
import { Link, useNavigate } from "react-router-dom";

import type { RootState } from "../../../redux/store";
import type {
  IExperience,
  IEducation,
} from "../../../modules/developers/models/IDeveloper";

import {
  FETCH_MY_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
} from "../../../redux/profiles/profile.types";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this

  const { loading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const { profile } = useSelector((state: RootState) => state.profile);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/users/login");
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: FETCH_MY_PROFILE });
    }
  }, [dispatch, isAuthenticated]);

  const clickDeleteExperience = (expId?: string) => {
    if (expId) dispatch({ type: DELETE_EXPERIENCE, payload: { id: expId } });
  };

  const clickDeleteEducation = (eduId?: string) => {
    if (eduId) dispatch({ type: DELETE_EDUCATION, payload: { id: eduId } });
  };

  if (loading) return <Spinner />;

  // ✅ Show loading while checking authentication
  if (!isAuthenticated && loading) {
    return <Spinner tip="Checking authentication..." />;
  }

  return (
    <section className="mt-3">
      {/* Header */}
      <div className="container">
        <p className="h3 text-teal">
          <i className="fa fa-sitemap" /> Dashboard
        </p>
        {user && <p className="text-teal">Welcome {user.name}</p>}
      </div>

      {/* Buttons */}
      <div className="container">
        {profile ? (
          <>
            <Link
              to={`/profiles/edit/${profile._id}`}
              className="btn btn-light-grey text-teal btn-sm"
            >
              <i className="fa fa-user-edit" /> Edit Profile
            </Link>

            <Link
              to="/profiles/education"
              className="btn btn-light-grey text-teal btn-sm"
            >
              <i className="fa fa-graduation-cap" /> Add Education
            </Link>

            <Link
              to="/profiles/experience"
              className="btn btn-light-grey text-teal btn-sm"
            >
              <i className="fa fa-user-clock" /> Add Experience
            </Link>
          </>
        ) : (
          <Link
            to="/profiles/create"
            className="btn btn-light-grey text-teal btn-sm"
          >
            <i className="fa fa-user-tie" /> Create Profile
          </Link>
        )}
      </div>

      {/* Experience Section */}
      {profile && profile.experience && profile.experience.length > 0 && (
        <section className="container mt-3">
          <p className="h3 text-teal">Experience Details</p>

          <table className="table table-hover text-center table-striped">
            <thead className="bg-teal text-white">
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>From</th>
                <th>To</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {profile.experience.map((exp: IExperience) => (
                <tr key={exp._id}>
                  <td>{exp.title}</td>
                  <td>{exp.company}</td>
                  <td>{exp.location}</td>
                  <td>{exp.from}</td>
                  <td>{exp.to ?? "-"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => clickDeleteExperience(exp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Education Section */}
      {profile && profile.education && profile.education.length > 0 && (
        <section className="container mt-3">
          <p className="h3 text-teal">Education Details</p>

          <table className="table table-hover text-center table-striped">
            <thead className="bg-teal text-white">
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Field Of Study</th>
                <th>From</th>
                <th>To</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {profile!.education!.map((edu: IEducation) => (
                <tr key={edu._id}>
                  <td>{edu.school}</td>
                  <td>{edu.degree}</td>
                  <td>{edu.fieldOfStudy}</td>
                  <td>{edu.from}</td>
                  <td>{edu.to ?? "-"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => clickDeleteEducation(edu._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
};

export default Dashboard;
