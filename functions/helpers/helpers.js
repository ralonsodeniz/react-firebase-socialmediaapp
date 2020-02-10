const isEmpty = string => {
  if (string.trim() === "") return true;
  return false;
};

const isEmail = string => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (string.match(emailRegEx)) return true;
  return false;
};

exports.validateSingupData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "must not be empty";
  if (!isEmail(data.email)) errors.email = "must be a valid email address";

  if (isEmpty(data.password)) errors.password = "must not be empty";

  if (data.confirmPassword !== data.password)
    errors.confirmPassword = "passwords must match";

  if (isEmpty(data.handle)) errors.handle = "must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "must not be empty";
  if (!isEmail(data.email)) errors.email = "must be a valid email address";

  if (isEmpty(data.password)) errors.password = "must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    // we check if the website has the proper starting http:// - https:// and if not we add it
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
