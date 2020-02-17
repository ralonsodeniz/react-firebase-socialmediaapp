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
