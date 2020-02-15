import axios from "axios";
import jwtDecode from "jwt-decode";

export const setAuthorizationHeader = token => {
  // we create a const for the token we get as response
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  // since we have gotten a token we can set it as default on the axios header for futher actions so we can access the protected routes
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const postUserDataToLogin = async userData => {
  try {
    const res = await axios.post("/login", userData);
    // we save the jwt to the local storage so when a user reloads the page they do not have to relog unless the session has expired
    setAuthorizationHeader(res.data.token);
  } catch (error) {
    // we convert the error data object into a json so we can throw it in the new error string to then decode it in the sagas and set the errors
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const postNewUserDataToSignup = async newUserData => {
  try {
    const res = await axios.post("/signup", newUserData);
    setAuthorizationHeader(res.data.token);
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const getDataFromUser = async () => {
  try {
    // we get the user data from the /user endpoint using the token we stored in the authorization header from the login
    const { data } = await axios.get("/user");
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const userLogout = () => {
  try {
    if (localStorage.FBIdToken) {
      localStorage.removeItem("FBIdToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  } catch (error) {
    const jsonObjError = JSON.stringify(error);
    throw new Error(jsonObjError);
  }
};

export const checkStoredToken = () => {
  const FBIdToken = localStorage.FBIdToken;
  let isTokenValid = false;
  try {
    if (FBIdToken) {
      // we decode the token using jwt-decode library to get the expiration day
      const decodedToken = jwtDecode(FBIdToken);
      const { exp } = decodedToken;
      // exp is an epoch time value, Date.now is a date in seconds so we have to convert it to miliseconds to get the expiring date
      if (exp * 1000 > Date.now()) {
        isTokenValid = true;
        axios.defaults.headers.common["Authorization"] = FBIdToken;
      }
    }
    return isTokenValid;
  } catch (error) {
    const jsonObjError = JSON.stringify({
      general: "Something went wrong while checking credentials"
    });
    throw new Error(jsonObjError);
  }
};

export const postFormDataToImage = async formData => {
  try {
    await axios.post("/user/image", formData);
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const postUserDetailsToUser = async userDetails => {
  try {
    await axios.post("/user", userDetails);
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};
