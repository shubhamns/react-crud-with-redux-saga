import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUserById } from "./../redux/actions/user";

const UserUpdate = () => {
  const fields = {
    name: "",
    email: "",
    password: "",
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.user?.loading);
  const user = useSelector((state) => state.user?.user);
  const [values, setValues] = useState(fields);
  const [errors, setErrors] = useState(fields);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  useEffect(() => {
    handleValidate(values);
  }, [values]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (handleValidate(values)) {
      dispatch(updateUserById(id, values, history));
    }
  };

  const handleValidate = (values) => {
    let errors = {};
    let isValid = true;
    if (!values["name"]) {
      isValid = false;
      errors["name"] = "Please enter name.";
    }
    if (typeof values["email"] !== "undefined") {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(values["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    if (!values["email"]) {
      isValid = false;
      errors["email"] = "Please enter email address.";
    }
    if (typeof values["password"] !== "undefined") {
      if (values["password"].length !== 6 && values["password"].length < 6) {
        isValid = false;
        errors["password"] = "Password must be at least 6 characters long.";
      }
    }
    if (!values["password"]) {
      isValid = false;
      errors["password"] = "Please enter password.";
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center my-4">Update User</h2>
        <form name="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !!errors.name ? " is-invalid" : "")
              }
            />
            {submitted && !!errors.name && (
              <div className="inline-errormsg">{errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !!errors.email ? " is-invalid" : "")
              }
            />
            {submitted && !!errors.email && (
              <div className="inline-errormsg">{errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={
                "form-control" +
                (submitted && !!errors.password ? " is-invalid" : "")
              }
            />
            {submitted && !!errors.password && (
              <div className="inline-errormsg">{errors.password}</div>
            )}
          </div>

          <div className="form-group text-center my-4">
            <button type="submit" disabled={loading} className="btn btn-danger">
              Submit
            </button>
            {loading && (
              <img
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                className="loading"
                alt="loading"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
