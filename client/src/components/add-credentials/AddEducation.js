import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addEducation} from "../../actions/profileActions"

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
  });

  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxErrors = useSelector((state) => state.errors);

  useEffect(() => {
    if (reduxErrors) {
      setErrors(reduxErrors);
    }
  }, [reduxErrors]);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
}
const onCheck = () => {
    setFormData((prev) => ({ ...prev, current: !prev.current }));
    setDisabled((prev) => !prev);
  };

const onSubmit= (e) => {
    e.preventDefault();
    const eduData ={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    dispatch(addEducation(eduData, navigate))
}


return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                type="date"
                name="from"
                value={from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                error={errors.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                    Current School
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the program that you were in"
              />
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

export default AddEducation;
