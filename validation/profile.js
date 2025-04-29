const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  // Convert status to string if it's an array
  if (Array.isArray(data.status)) {
    data.status = data.status.join(","); // or just take the first: data.status = data.status[0]
  }
  data.status = !isEmpty(data.status) ? data.status : "";

  data.skills = !isEmpty(data.skills)
    ? // Handle case where skills comes in as array
      Array.isArray(data.skills)
      ? data.skills.join(",")
      : data.skills
    : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid url";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
