import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CREATE_PROFILE,
  type SubmitProfilePayload,
} from "../../../redux/profiles/profile.types";

const CreateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type ProfileFormState = {
    company: string;
    website: string;
    location: string;
    designation: string;
    skills: string;
    bio: string;
    githubUsername: string;
    youtube: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };

  const [state, setState] = useState<ProfileFormState>({
    company: "",
    website: "",
    location: "",
    designation: "",
    skills: "",
    bio: "",
    githubUsername: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const submitCreateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 🔥 Convert to backend expected structure
    const profilePayload = {
      user: "", // Add the required user property
      company: state.company,
      website: state.website,
      location: state.location,
      designation: state.designation,
      skills: state.skills.split(",").map((s) => s.trim()),
      bio: state.bio,
      githubUsername: state.githubUsername,
      social: {
        youtube: state.youtube,
        facebook: state.facebook,
        twitter: state.twitter,
        instagram: state.instagram,
        linkedin: state.linkedin,
      },
    };

    const payload: SubmitProfilePayload = {
      profile: profilePayload,
      navigate,
    };

    dispatch({ type: CREATE_PROFILE, payload });
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3 text-teal">
              <i className="fa fa-user-tie" /> Create Profile
            </p>
            <p>
              Build your profile to showcase your skills, experience, and social
              presence.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={submitCreateProfile}>
              {/* Company */}
              <div className="mb-2">
                <input
                  required
                  name="company"
                  value={state.company}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Company"
                />
              </div>

              {/* Website */}
              <div className="mb-2">
                <input
                  required
                  name="website"
                  value={state.website}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Website"
                />
              </div>

              {/* Location */}
              <div className="mb-2">
                <input
                  required
                  name="location"
                  value={state.location}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Location"
                />
              </div>

              {/* Designation */}
              <div className="mb-2">
                <select
                  required
                  name="designation"
                  value={state.designation}
                  onChange={updateInput}
                  className="form-control"
                >
                  <option value="">Select Designation</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Junior Manager">Junior Manager</option>
                  <option value="Senior Manager">Senior Manager</option>
                  <option value="Director">Director</option>
                </select>
              </div>

              {/* Skills */}
              <div className="mb-2">
                <input
                  required
                  name="skills"
                  value={state.skills}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Skills (comma separated)"
                />
              </div>

              {/* Bio */}
              <div className="mb-2">
                <textarea
                  required
                  name="bio"
                  value={state.bio}
                  onChange={updateInput}
                  rows={3}
                  className="form-control"
                  placeholder="Bio"
                />
              </div>

              {/* GitHub Username */}
              {["youtube", "facebook", "twitter", "linkedin", "instagram"].map(
                (platform) => (
                  <div className="mb-2" key={platform}>
                    <input
                      required
                      name={platform}
                      value={state[platform as keyof ProfileFormState]}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    />
                  </div>
                )
              )}
              {["youtube", "facebook", "twitter", "linkedin", "instagram"].map(
                (platform) => (
                  <div className="mb-2" key={platform}>
                    <input
                      required
                      name={platform}
                      value={state[platform as keyof ProfileFormState]}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    />
                  </div>
                )
              )}

              <div className="mb-2">
                <input
                  type="submit"
                  className="btn btn-light-grey btn-sm text-teal"
                  value="Create"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;
