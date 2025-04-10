import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";


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
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg m-2", {
                    "is-invalid": errors.name,
                  })}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback"> {errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg m-2", {
                    "is-invalid": errors.email,
                  })}
                  placeholder="Email Address"
                  noValidate
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg m-2", {
                    "is-invalid": errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg m-2", {
                    "is-invalid": errors.password2,
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
