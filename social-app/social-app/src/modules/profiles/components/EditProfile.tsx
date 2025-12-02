import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../redux/store";
import {
  FETCH_MY_PROFILE,
  UPDATE_PROFILE,
  type SubmitProfilePayload,
} from "../../../redux/profiles/profile.types";

import Spinner from "../../../layout/util/Spinner";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, profile } = useSelector((state: RootState) => state.profile);

  type FormFields = {
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

  const initialForm: FormFields = React.useMemo(() => ({
    company: profile?.company ?? "",
    website: profile?.website ?? "",
    location: profile?.location ?? "",
    designation: profile?.designation ?? "",
    skills: profile?.skills?.join(", ") ?? "",
    bio: profile?.bio ?? "",
    githubUsername: profile?.githubUsername ?? "",
    youtube: profile?.social?.youtube ?? "",
    facebook: profile?.social?.facebook ?? "",
    twitter: profile?.social?.twitter ?? "",
    instagram: profile?.social?.instagram ?? "",
    linkedin: profile?.social?.linkedin ?? "",
  }), [profile]);

  const [form, setForm] = useState<FormFields>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  // --------------------------------------------------------------------
  // Load profile via Saga
  // --------------------------------------------------------------------
  useEffect(() => {
    dispatch({ type: FETCH_MY_PROFILE });
  }, [dispatch]);

  // --------------------------------------------------------------------
  // Update form input
  // --------------------------------------------------------------------
  const updateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // --------------------------------------------------------------------
  // Submit Update Profile
  // --------------------------------------------------------------------
  const submitUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      company: form.company,
      website: form.website,
      location: form.location,
      designation: form.designation,
      skills: form.skills.split(",").map((s) => s.trim()),
      bio: form.bio,
      githubUsername: form.githubUsername,
      social: {
        youtube: form.youtube,
        facebook: form.facebook,
        twitter: form.twitter,
        instagram: form.instagram,
        linkedin: form.linkedin,
      },
    };

    const payload: SubmitProfilePayload = {
      profile: updatedProfile,
      navigate,
    };

    dispatch({ type: UPDATE_PROFILE, payload });
  };

  // --------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------
  if (loading || !profile) return <Spinner />;

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3 text-teal">
              <i className="fa fa-user-edit" /> Edit Profile
            </p>
            <p>Modify your professional and social details below.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={submitUpdateProfile}>
              {/* FORM FIELDS */}
              {[
                "company",
                "website",
                "location",
                "githubUsername",
                "skills",
                "bio",
              ].map((field) =>
                field === "bio" ? (
                  <div className="mb-2" key={field}>
                    <textarea
                      required
                      name="bio"
                      rows={3}
                      className="form-control"
                      value={form.bio}
                      onChange={updateInput}
                      placeholder="Bio"
                    />
                  </div>
                ) : (
                  <div className="mb-2" key={field}>
                    <input
                      required
                      name={field}
                      value={form[field as keyof typeof form]}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                )
              )}

              {/* Designation */}
              <div className="mb-2">
                <select
                  required
                  name="designation"
                  value={form.designation}
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

              <hr />

              {/* Social Links */}
              {["youtube", "facebook", "twitter", "linkedin", "instagram"].map(
                (platform) => (
                  <div className="mb-2" key={platform}>
                    <input
                      required
                      name={platform}
                      value={form[platform as keyof FormFields]}
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
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
