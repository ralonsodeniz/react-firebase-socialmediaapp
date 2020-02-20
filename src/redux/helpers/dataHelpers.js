import axios from "axios";

export const getScreamsFromScreams = async () => {
  try {
    const { data } = await axios.get("/screams");
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const getLikeScreamFromScream = async screamId => {
  try {
    const { data } = await axios.get(`/scream/${screamId}/like`);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const getUnikeScreamFromScream = async screamId => {
  try {
    const { data } = await axios.get(`/scream/${screamId}/unlike`);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const deleteScreamFromScream = async screamId => {
  try {
    await axios.delete(`/scream/${screamId}`);
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const postScreamToscream = async screamData => {
  try {
    const { data } = await axios.post("/scream", screamData);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const getScreamFromScream = async screamId => {
  try {
    const { data } = await axios.get(`/scream/${screamId}`);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const postCommentToScream = async (comment, screamId) => {
  try {
    const { data } = await axios.post(`/scream/${screamId}/comment`, comment);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};

export const getUserFromUser = async userHandle => {
  try {
    const { data } = await axios.get(`/user/${userHandle}`);
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};
