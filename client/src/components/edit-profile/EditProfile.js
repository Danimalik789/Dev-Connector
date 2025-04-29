import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
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
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileState = useSelector((state) => state.profile);
  const errorState = useSelector((state) => state.errors);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (errorState) {
      setErrors(errorState);
    }

    if (profileState.profile) {
      const profile = profileState.profile;

      // Convert skills array to CSV
      const skillsCSV = Array.isArray(profile.skills)
        ? profile.skills.join(",")
        : profile.skills || "";

      // Fallbacks for undefined fields
      const social = !isEmpty(profile.social) ? profile.social : {};

      setFormData({
        handle: profile.handle || "",
        company: profile.company || "",
        website: profile.website || "",
        location: profile.location || "",
        status: profile.status || "",
        skills: skillsCSV,
        githubusername: profile.githubusername || "",
        bio: profile.bio || "",
        twitter: social.twitter || "",
        facebook: social.facebook || "",
        linkedin: social.linkedin || "",
        youtube: social.youtube || "",
        instagram: social.instagram || "",
      });
    }
  }, [profileState.profile, errorState]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, navigate));
  };

  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

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

  const socialInputs = displaySocialInputs && (
    <>
      <InputGroup
        placeholder="Twitter Profile URL"
        name="twitter"
        icon="fab fa-twitter"
        value={twitter}
        onChange={onChange}
        error={errors.twitter}
      />
      <InputGroup
        placeholder="Facebook Page URL"
        name="facebook"
        icon="fab fa-facebook"
        value={facebook}
        onChange={onChange}
        error={errors.facebook}
      />
      <InputGroup
        placeholder="Linkedin Profile URL"
        name="linkedin"
        icon="fab fa-linkedin"
        value={linkedin}
        onChange={onChange}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder="YouTube Channel URL"
        name="youtube"
        icon="fab fa-youtube"
        value={youtube}
        onChange={onChange}
        error={errors.youtube}
      />
      <InputGroup
        placeholder="Instagram Page URL"
        name="instagram"
        icon="fab fa-instagram"
        value={instagram}
        onChange={onChange}
        error={errors.instagram}
      />
    </>
  );

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func,
  getCurrentProfile: PropTypes.func,
};

export default CreateProfile;
