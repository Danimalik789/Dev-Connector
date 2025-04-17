import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

const CreateProfile = () => {
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

  useEffect(() => {
    if (reduxErrors) {
      setErrors(reduxErrors);
    }
  }, [reduxErrors]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  let socialInputs;

  if (displaySocialInputs) {
    socialInputs = (
      <>
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter m-2"
            value={formData.twitter}
            onChange={onChange}
            error={errors.twitter}
          />
        </div>
        <div>
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook m-2"
            value={formData.facebook}
            onChange={onChange}
            error={errors.facebook}
          />
        </div>
        <div>
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube m-2"
            value={formData.youtube}
            onChange={onChange}
            error={errors.youtube}
          />
        </div>
        <div>
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin m-2"
            value={formData.linkedin}
            onChange={onChange}
            error={errors.linkedin}
          />
        </div>
        <div>
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram m-2"
            value={formData.instagram}
            onChange={onChange}
            error={errors.instagram}
          />
        </div>
      </>
    );
  }
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's add some information to make your profile stand out
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
                placeholder="* Status"
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
                info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={formData.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
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
                  Add Social Networks Link
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

export default CreateProfile;
