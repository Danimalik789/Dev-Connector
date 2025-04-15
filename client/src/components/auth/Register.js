import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector((state) => state.errors);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData, navigate));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                error={errors.email}
                info=" This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={onChange}
                error={errors.password2}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
