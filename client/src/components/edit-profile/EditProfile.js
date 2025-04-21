import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });

  const [errors, setErrors] = useState({});
  const { displaySocialInputs } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxErrors = useSelector((state) => state.errors);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (reduxErrors) {
      setErrors(reduxErrors);
    }
  }, [reduxErrors]);

  useEffect(() => {
    if (profile) {
      setFormData((prevData) => ({
        ...prevData,
        handle: !isEmpty(profile.handle) ? profile.handle : "",
        company: !isEmpty(profile.company) ? profile.company : "",
        website: !isEmpty(profile.website) ? profile.website : "",
        location: !isEmpty(profile.location) ? profile.location : "",
        status: !isEmpty(profile.status) ? profile.status : "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(",") : "",
        githubusername: !isEmpty(profile.githubusername) ? profile.githubusername : "",
        bio: !isEmpty(profile.bio) ? profile.bio : "",
        twitter: !isEmpty(profile.social?.twitter) ? profile.social.twitter : "",
        facebook: !isEmpty(profile.social?.facebook) ? profile.social.facebook : "",
        youtube: !isEmpty(profile.social?.youtube) ? profile.social.youtube : "",
        linkedin: !isEmpty(profile.social?.linkedin) ? profile.social.linkedin : "",
        instagram: !isEmpty(profile.social?.instagram) ? profile.social.instagram : "",
      }));
    }
  }, [profile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, navigate));
  };

  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="edit-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <p className="lead text-center">
              Update your profile information below
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextAreaFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={formData.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                name="status"
                value={formData.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={formData.skills}
                onChange={onChange}
                error={errors.skills}
                info="Use comma separated values (e.g. HTML,CSS,JavaScript)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={formData.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="Include your GitHub username to display your repos"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={formData.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      displaySocialInputs: !prev.displaySocialInputs,
                    }))
                  }
                  className="btn-btn-light"
                >
                  Edit Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>

              {displaySocialInputs && (
                <>
                  <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter m-2"
                    value={formData.twitter}
                    onChange={onChange}
                    error={errors.twitter}
                  />
                  <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook m-2"
                    value={formData.facebook}
                    onChange={onChange}
                    error={errors.facebook}
                  />
                  <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube m-2"
                    value={formData.youtube}
                    onChange={onChange}
                    error={errors.youtube}
                  />
                  <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin m-2"
                    value={formData.linkedin}
                    onChange={onChange}
                    error={errors.linkedin}
                  />
                  <InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram m-2"
                    value={formData.instagram}
                    onChange={onChange}
                    error={errors.instagram}
                  />
                </>
              )}

              <input
                type="submit"
                value="Save Changes"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
